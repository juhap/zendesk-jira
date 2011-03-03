/*

This is a version of the Zendesk JIRA widget code that can be used to create a custom widget.
1. Visit Account > Widgets > Add Widget
2. Select "Custom Widget"
3. Add the following code to your custom widget.  Note that Widget.require is used to include the widget code.  This is used
in lieu of a normal <script> tag in order to allow Zendesk to control how widget code is loaded on the page.

<div id="jira_custom_template" ticket_id="{{ticket.id <http://ticket.id> }}" url="" username="integration" password="Buddha410" custom_field_id="10000" subject="{{ticket.title}}" description="{{ticket.description}}" external_id="{{ticket.external_id}}">
  <div id="content"></div>
</div>

<script type="text/javascript">
  Widget.require('http://sutra.heroku.com/javascripts/jira_custom_template.js', {type: 'text/javascript'});
</script>
*/

var JiraCustomHelper = {

  GET_SESSION: new Template(
    '<?xml version="1.0" encoding="utf-8"?>' + 
    '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:soapenc="http://schemas.xmlsoap.org/soap/encoding/" xmlns:tns="#{url}rpc/soap/jirasoapservice-v2" xmlns:types="#{url}rpc/soap/jirasoapservice-v2/encodedTypes" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">' +
    '  <soap:Body soap:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">' +
    '    <q1:login xmlns:q1="http://soap.rpc.jira.atlassian.com">' +
    '      <in0 xsi:type="xsd:string">#{username}</in0>' +
    '      <in1 xsi:type="xsd:string">#{password}</in1>' +
    '    </q1:login>' + 
    '  </soap:Body>' +
    '</soap:Envelope>'
  ),

  GET_PROJECTS: new Template(
    '<?xml version="1.0" encoding="UTF-8"?>' + 
    '<SOAP-ENV:Envelope xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:SOAP-ENC="http://schemas.xmlsoap.org/soap/encoding/" SOAP-ENV:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/">' +
    '  <SOAP-ENV:Body>' + 
    '    <m:getProjectsNoSchemes xmlns:m="#{url}rpc/soap/jirasoapservice-v2">' +
    '      <in0 xsi:type="xsd:string">#{sessionId}</in0>' +
    '    </m:getProjectsNoSchemes>' +
    '  </SOAP-ENV:Body>' + 
    '</SOAP-ENV:Envelope>'
  ),

  GET_PRIORITIES: new Template(
    '<?xml version="1.0" encoding="UTF-8"?>' +
    '<SOAP-ENV:Envelope xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:SOAP-ENC="http://schemas.xmlsoap.org/soap/encoding/" SOAP-ENV:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/">' +
    '  <SOAP-ENV:Body>' +
    '    <m:getPriorities xmlns:m="#{url}rpc/soap/jirasoapservice-v2">' +
    '      <in0 xsi:type="xsd:string">#{sessionId}</in0>' +
    '    </m:getPriorities>' +
    '  </SOAP-ENV:Body>' +
    '</SOAP-ENV:Envelope>'
  ),


  GET_ASSIGNEES: new Template(
    '<?xml version="1.0" encoding="utf-8"?>' +
    '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:soapenc="http://schemas.xmlsoap.org/soap/encoding/" xmlns:tns="#{url}rpc/soap/agilossoapservice-v1" xmlns:types="#{url}rpc/soap/agilossoapservice-v1/encodedTypes" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">' +
    '  <soap:Body soap:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">' +
    '    <q1:getAssignableUsers xmlns:q1="#{url}">' +
    '      <in0 xsi:type="xsd:string">#{sessionId}</in0>' +
    '      <in1 xsi:type="xsd:string">#{projectKey}</in1>' +
    '    </q1:getAssignableUsers>' +
    '  </soap:Body>' +
    '</soap:Envelope>'
  ),

  GET_ISSUE_TYPES2: new Template(
    '<?xml version="1.0" encoding="utf-8"?>' +
    '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:soapenc="http://schemas.xmlsoap.org/soap/encoding/" xmlns:tns="#{url}rpc/soap/jirasoapservice-v2" xmlns:types="#{url}rpc/soap/jirasoapservice-v2/encodedTypes" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">' +
    '<soap:Body soap:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">' +
    '  <q1:getIssueTypesForProject xmlns:q1="http://soap.rpc.jira.atlassian.com">' +
    '   <in0 xsi:type="xsd:string">#{sessionId}</in0>' +
    '   <in1 xsi:type="xsd:string">#{projectId}</in1>' +
    '  </q1:getIssueTypesForProject>' +
    '</soap:Body>' +
    '</soap:Envelope>'
  ),
  
  GET_ISSUE_TYPES: new Template(
    '<?xml version="1.0" encoding="utf-8"?>' +
    '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:soapenc="http://schemas.xmlsoap.org/soap/encoding/" xmlns:tns="#{url}rpc/soap/jirasoapservice-v2" xmlns:types="#{url}rpc/soap/jirasoapservice-v2/encodedTypes" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">' +
    '<soap:Body soap:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">' +
    '<q1:getIssueTypesForProject xmlns:q1="http://soap.rpc.jira.atlassian.com">' +
    '<in0 xsi:type="xsd:string">#{sessionId}</in0>' +
    '<in1 xsi:type="xsd:string">#{projectId}</in1>' +
    '</q1:getIssueTypesForProject>' +
    '</soap:Body>' +
    '</soap:Envelope>'
  ),
  
  SUBMIT_ISSUE: new Template(
    '<?xml version="1.0" encoding="ISO-8859-1"?>' +
    '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:soapenc="http://schemas.xmlsoap.org/soap/encoding/" xmlns:tns="#{url}rpc/soap/jirasoapservice-v2" xmlns:types="#{url}rpc/soap/jirasoapservice-v2/encodedTypes" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">' +
    '  <soap:Body soap:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">' +
    '    <q1:createIssue xmlns:q1="http://soap.rpc.jira.atlassian.com">' +
    '      <in0 xsi:type="xsd:string">#{sessionId}</in0>' +
    '      <in1 href="#id1" />' +
    '    </q1:createIssue>' +
    '    <q2:RemoteIssue id="id1" xsi:type="q2:RemoteIssue" xmlns:q2="http://beans.soap.rpc.jira.atlassian.com">' +
    '      <id xsi:nil="true" />' +
    '      <affectsVersions xsi:nil="true" />' +
    '      <assignee xsi:type="xsd:string">#{assignee}</assignee>' +
    '      <attachmentNames xsi:nil="true" />' +
    '      <components xsi:nil="true" />' +
    '      <created xsi:nil="true" />' +
    '      <customFieldValues xsi:nil="true" />' +
    '      <description>#{description}</description>' +
    '      <duedate xsi:nil="true" />' +
    '      <environment xsi:nil="true" />' +
    '      <fixVersions xsi:nil="true" />' +
    '      <key xsi:nil="true" />' +
    '      <priority xsi:type="xsd:string" >#{priority}</priority>' +
    '      <project xsi:type="xsd:string">#{projectKey}</project>' +
    '      <reporter xsi:nil="true" />' +
    '      <resolution xsi:nil="true" />' +
    '      <status xsi:nil="true" />' +
    '      <summary xsi:type="xsd:string">#{summary}</summary>' +
    '      <type xsi:type="xsd:string">#{type}</type>' +
    '      <updated xsi:nil="true" />' +
    '      <votes xsi:nil="true" />' +
    '      <customFieldValues href="#id2" />' +
    '    </q2:RemoteIssue>' +
    '    <soapenc:Array id="id2" xmlns:q3="http://beans.soap.rpc.jira.atlassian.com" soapenc:arrayType="q3:RemoteCustomFieldValue[1]">' +
    '      <Item href="#id3" />' +
    '    </soapenc:Array>' +
    '    <q4:RemoteCustomFieldValue id="id3" xsi:type="q4:RemoteCustomFieldValue" xmlns:q4="http://beans.soap.rpc.jira.atlassian.com">' +
    '      <customfieldId xsi:type="xsd:string">customfield_#{customFieldId}</customfieldId>' +
    '      <key xsi:nil="true" />' +
    '      <values href="#id4" />' +
    '    </q4:RemoteCustomFieldValue>' +
    '    <soapenc:Array id="id4" soapenc:arrayType="xsd:string[1]">' +
    '      <Item>#{ticketId}</Item>' +
    '    </soapenc:Array>' +
    '  </soap:Body>' +
    '</soap:Envelope>'
  ),
  
  SUBMIT_FORM: new Template(
    '<form class="form" id="jira-form-#{widgetId}">' +
    ' Submit this ticket as a new issue' + 
    ' <label>Project</label><select name="projectId" id="jiraProjectSelector" class="jiraProjectSelector" onchange="jira_custom_widget.projectsSelector(this.options[this.selectedIndex].value)"></select>' + 
    ' <label>Type</label><select name="typeId" id="jiraTypeSelector" class="jiraTypeSelector"></select>' + 
    ' <label>Priority</label><select name="priority" id="jiraPrioritySelector" class="jiraPrioritySelector"></select>' +
    ' <label>Assignee ID</label><select name="jiraAssigneeSelector" class="jiraAssigneeSelector" id="jiraAssigneeSelector"></select>' + 
    ' <label></label><input type="button" value="Submit" id="submit" class="jiraSubmit" onclick="jira_custom_widget.submitIssue($(\'jiraForm-#{widgetId}\'));return false;">' +              
    '</form>'
  ),

  EXTERNAL_ID: new Template(
    '<ticket><external-id>#{externalId}</external-id><additional-tags>jira</additional-tags></ticket>'
  ),

  NOTICE: new Template(
    'This ticket is related to the following issue in JIRA:<br /><br /><b><a href="#{url}/browse/#{externalId}" target=_blank>#{externalId}</a></b>' + 
    '<br />&nbsp;'
  ),
  
  MISSING_TICKET: new Template(
    'Only available when viewing tickets.' +
    '<br />&nbsp;'
  ),

  getSessionRequest: function(username, password, url) {
    return escape(this.GET_SESSION.evaluate({ username: username, password: password, url: url }));
  },

  getProjectsRequest: function(sessionId, url) {
    return escape(this.GET_PROJECTS.evaluate({ sessionId: sessionId, url: url }));
  },

  getPrioritiesRequest: function(sessionId, url) {
    return escape(this.GET_PRIORITIES.evaluate({ sessionId: sessionId, url: url }));
  },

  
  getProjectsAssigneeRequest: function(sessionId, url, projectKey) {
    return escape(this.GET_ASSIGNEES.evaluate({ sessionId: sessionId, url: url, projectKey: projectKey}));
  },

  getProjectsIssueTypesRequest: function(sessionId, url, projectId) {
    return escape(this.GET_ISSUE_TYPES.evaluate({ sessionId: sessionId, url: url, projectId: projectId}));
  },

  getSubmitRequest: function(sessionId, url, assignee, priority, type, projectKey, summary, description, ticketId, customFieldId) {
    // Already encoded, no need to encode again for UTF-8 XML
    return escape(this.SUBMIT_ISSUE.evaluate({ sessionId: sessionId, url: url, assignee: assignee, priority: priority, projectKey: projectKey, type: type, summary: XmlCustomHelper.encodeString(summary), description: XmlCustomHelper.encodeString(description), ticketId: ticketId, customFieldId: customFieldId }));
  },

  getSubmitForm: function(widgetId) {
    return (this.SUBMIT_FORM.evaluate({widgetId: widgetId}));
  },

  getInJiraNotice: function(url, externalId) {
    return (this.NOTICE.evaluate({url: url, externalId: externalId}));
  },
  
  getMissingTicketMessage: function () {
    return (this.MISSING_TICKET.evaluate({}));
  },

  setExternalIdRequest: function (externalId) {
    return this.EXTERNAL_ID.evaluate({ externalId: externalId })
  },

  PROXY_URL1: new Template(
    '/proxy/direct?log=1&url=#{url}rpc/soap/jirasoapservice-v2&json=1&SOAPAction='
  ),

  PROXY_URL2: new Template(
    '/proxy/direct?log=1&url=#{url}rpc/soap/agilossoapservice-v1?&SOAPAction='
  ),

  getProxyUrl: function(url, body) {
    return escape(this.PROXY_URL1.evaluate({ url: url, body: body }));
  },

  getProxyUrl2: function(url, body) {
    return escape(this.PROXY_URL2.evaluate({ url: url, body: body }));
  },

  getSessionUrl: function(username, password, url) {
    doc = JiraCustomHelper.getSessionRequest(username, password, url);
    url = JiraCustomHelper.getProxyUrl(url, doc);
    return url;
  },

  getNodeValue: function(document, nodeName) {
    if(Prototype.Browser.WebKit) {
      nodeName = nodeName.replace("sf:","");
    }
  
    node = document.getElementsByTagName(nodeName);
    if(node == null || node.length == 0) {
      return null;
    }
    return node[0].childNodes[0].nodeValue;
  },

  getNodeString: function(document, nodeName) {
    value = this.getNodeValue(document, nodeName);

    if(value == null) {
      return '';
    }
    else {
      return value;
    }
  },

  getRecords: function(document, ns, tagName) {
    results = document.getElementsByTagName(tagName);
    if (results.length == 0)
      results = document.getElementsByTagName(ns + ':' + tagName);
      
    if(results == null) {
      return new Array();
    }
    return results;
  },
  
  populateProjects: function(contentRoot, responseXML) {
    var keys = [];
    var projects = [];

    if ($('jiraProjectSelector').options.length == 0) {
      var multiRefs = $A(XmlCustomHelper.getRecords(responseXML, "", "multiRef"));

      multiRefs.each(function(multiRef) {
        projects.push(new JiraCustomProject(multiRef));
      });

      projects.sort(function(a, b) {
        return a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1;
      });

      projectSelector = contentRoot.down("select.jiraProjectSelector");
      projectSelector.appendChild(new Element("option"));

      projects.each(function(project) {
        var option = new Element("option");
        option.value = project.key;
        option.innerHTML = project.name;
        projectSelector.appendChild(option);

        keys[project.key] = project.id;
      });
    }

    return keys;
  },

  populatePriorities: function(contentRoot, responseXML) {
    var priorities = [];
    var multiRefs = $A(XmlCustomHelper.getRecords(responseXML, "", "multiRef"));

    multiRefs.each(function(multiRef) {
      priorities.push(new JiraCustomPriority(multiRef));
    });

    priorities.sort(function(a, b) {
      return a.id < b.id ? -1 : 1;
    });

    prioritySelector = contentRoot.down("select.jiraPrioritySelector");
    prioritySelector.appendChild(new Element("option"));

    priorities.each(function(priority) {
      var option = new Element("option");
      option.value = priority.id;
      option.innerHTML = priority.name;
      prioritySelector.appendChild(option);
    });
  },


  populateProjectIssueTypes: function(contentRoot, responseXML) {
    var types = [];
    var multiRefs = $A(XmlCustomHelper.getRecords(responseXML, "", "multiRef"));

    multiRefs.each(function(multiRef) {
      types.push(new JiraCustomType(multiRef));
    });

    types.sort(function(a, b) {
      return a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1;
    });

    typeSelector = contentRoot.down("select.jiraTypeSelector");
    typeSelector.update("");
    typeSelector.appendChild(new Element("option"));

    types.each(function(type) {
      var option = new Element("option");
      option.value = type.id;
      option.innerHTML = type.name;
      typeSelector.appendChild(option);
    });
  },

  populateAssignees: function(contentRoot, responseXML) {
    var asignees = [];
    var multiRefs = $A(XmlCustomHelper.getRecords(responseXML, "", "multiRef"));

    multiRefs.each(function(multiRef) {
      asignees.push(new JiraCustomAsignee(multiRef));
    });

    asignees.sort(function(a, b) {
      return a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1;
    });

    asigneeSelector = contentRoot.down("select.jiraAssigneeSelector");
    asigneeSelector.update("");
    asigneeSelector.appendChild(new Element("option"));

    asignees.each(function(asignee) {
      var option = new Element("option");
      option.value = asignee.name;
      option.innerHTML = asignee.fullName;
      asigneeSelector.appendChild(option);
    });
  }

}

var XmlCustomHelper = {
  getTextContentByKey: function(document, key) {
    if (Prototype.Browser.IE)
      return document.getElementsByTagName(key)[0].childNodes[0].nodeValue;

    // all other browsers
    return document.getElementsByTagName(key)[0].textContent;
  },

  encodeString: function(st) {
    var result = st;
    
    result = result.replace(/&/g, '&amp;');
    result = result.replace(/</g, '&lt;');
    result = result.replace(/>/g, '&gt;');
    result = result.replace(/'/g, '&apos;');
    result = result.replace(/"/g, '&quot;');

    return result;
  },
  
  getRecords: function(document, ns, tagName) {
    results = document.getElementsByTagName(tagName);
    if (results.length == 0)
      results = document.getElementsByTagName(ns + ':' + tagName);
      
    if(results == null) {
      return new Array();
    }
    return results;
  }

}



var JiraCustomProject = Class.create({
  initialize: function(xml) {
    this.key  = XmlCustomHelper.getTextContentByKey(xml, "key");
    this.id   = XmlCustomHelper.getTextContentByKey(xml, "id");
    this.name = XmlCustomHelper.encodeString(XmlCustomHelper.getTextContentByKey(xml, "name"));
  }
});

var JiraCustomType = Class.create({
  initialize: function(xml) {
    this.id   = XmlCustomHelper.getTextContentByKey(xml, "id");
    this.name = XmlCustomHelper.encodeString(XmlCustomHelper.getTextContentByKey(xml, "name"));
  }
});

var JiraCustomAsignee = Class.create({
  initialize: function(xml) {
    this.name     = XmlCustomHelper.encodeString(XmlCustomHelper.getTextContentByKey(xml, "name"));
    this.fullName = XmlCustomHelper.encodeString(XmlCustomHelper.getTextContentByKey(xml, "fullname"));
  }
});

var JiraCustomPriority = Class.create({
  initialize: function(xml) {
    this.id   = XmlCustomHelper.getTextContentByKey(xml, "id");
    this.name = XmlCustomHelper.encodeString(XmlCustomHelper.getTextContentByKey(xml, "name"));
  }
});


var JiraCustomWidget = Class.create(Widget, {
  initialize: function($super, args) {
    this.url = args.url;
    this.username = args.username;
    this.password = args.password;
    this.formInstance = null;
    this.ticketId = args.ticketId;
    this.externalId = args.externalId == '' ? null : args.externalId;
    this.customFieldId = args.customFieldId;
    this.widgetId = args.id;
    this.subject = args.subject;
    this.description = args.description;
    this.projectIds = null;
    this.contentRoot = $$("#" + this.widgetId + " #content")[0];

    if(!this.url.endsWith('/')) {
      this.url += '/';      
    }
    
    this.start();
  },
  
  start: function() {
    if (this.ticketId) {
      if (this.externalId) {
        this.contentRoot.update(JiraCustomHelper.getInJiraNotice(this.url, this.externalId));
      } else {
        this.contentRoot.update(JiraCustomHelper.getSubmitForm(this.id));

        this.proxyUrl = JiraCustomHelper.PROXY_URL1.evaluate({ url: this.url });
        this.proxyUrl2 = JiraCustomHelper.PROXY_URL2.evaluate({ url: this.url });

        this.getSession();
      }
    } else {
      this.contentRoot.update(JiraCustomHelper.getMissingTicketMessage());
    }
  },
  
  getSession: function() {
    var doc = "body=" + JiraCustomHelper.getSessionRequest(this.username, this.password, this.url);

    new Ajax.Request(this.proxyUrl, {
      method:'post',
      postBody: doc,
      requestHeaders: { Accept: 'application/xml' },
      onSuccess: function(transport) {
        this.extractSessionID(transport.responseXML);
      }.bind(this),
      onFailure: function() {
        alert("Failed");
      }.bind(this)
     });
  },
  
  extractSessionID: function(responseXML) {
    var arr = JiraCustomHelper.getRecords(responseXML, "ns1", "loginResponse");

    if (arr.length == 1) {
      this.sessionId = JiraCustomHelper.getNodeString(arr[0], "loginReturn");
      this.getPriorities();
      this.getProjects();
    } else {
      alert("Login failed");
    }
  },
  
  getProjects: function() {
    var doc = "body=" + JiraCustomHelper.getProjectsRequest(this.sessionId, this.url);

    new Ajax.Request(this.proxyUrl, {
      method:'post',
      postBody: doc, 
      requestHeaders: { Accept: 'application/xml' },
      onSuccess: function(transport) {
        this.projectIds = JiraCustomHelper.populateProjects(this.contentRoot, transport.responseXML);
      }.bind(this),
      onFailure: function() {
        alert("Failed to get projects");
      }.bind(this)
     });
  },

  getPriorities: function() {
    var doc = "body=" + JiraCustomHelper.getPrioritiesRequest(this.sessionId, this.url);

    new Ajax.Request(this.proxyUrl, {
      method:'post',
      postBody: doc,
      requestHeaders: { Accept: 'application/xml' },
      onSuccess: function(transport) {
        this.priorities = JiraCustomHelper.populatePriorities(this.contentRoot, transport.responseXML);
      }.bind(this),
      onFailure: function() {
        alert("Failed to get priorities");
      }.bind(this)
     });
  },

  
  projectsSelector: function(projectkey) {
    var doc = "body=" + JiraCustomHelper.getProjectsAssigneeRequest(this.sessionId, this.url, projectkey);

    new Ajax.Request(this.proxyUrl2 , {
      method:'post',
      postBody: doc,
      requestHeaders: { Accept: 'application/xml' },
      onSuccess: function(transport) {
        JiraCustomHelper.populateAssignees(this.contentRoot, transport.responseXML);
      }.bind(this),
      onFailure: function() {
        alert("Failed to get projects");
      }.bind(this)
    });

    doc = "body=" + JiraCustomHelper.getProjectsIssueTypesRequest(this.sessionId, this.url, this.projectIds[projectkey] );

    new Ajax.Request(this.proxyUrl , {
      method:'post',
      postBody: doc,
      requestHeaders: { Accept: 'application/xml' },
      onSuccess: function(transport) {
        JiraCustomHelper.populateProjectIssueTypes(this.contentRoot, transport.responseXML);
      }.bind(this),
      onFailure: function() {
        alert("Failed to get projects");
      }.bind(this)
    });
  },
  
  submitIssue: function(form) {
		var url = "/tickets/" + this.ticketId + ".xml";

    new Ajax.Request(url, {
      method:'get',
      requestHeaders: { Accept: 'application/xml' },
      onSuccess: function(transport) {
				var subject = XmlCustomHelper.getTextContentByKey(transport.responseXML, "subject");
				this.submitIssue2(subject, this.description)
      }.bind(this),
      onFailure: function() {
        alert("Failed to submit issue.");
      }.bind(this)
    });
    return false;
  },

  submitIssue2: function(subject, description) {
    var doc = "body=" + JiraCustomHelper.getSubmitRequest(this.sessionId, this.url, this.contentRoot.down('select.jiraAssigneeSelector').getValue(),  this.contentRoot.down('select.jiraPrioritySelector').getValue(), this.contentRoot.down('select.jiraTypeSelector').getValue(), this.contentRoot.down("select.jiraProjectSelector").getValue(), subject, description, this.ticketId, this.customFieldId);
    
    new Ajax.Request(this.proxyUrl, {
      method:'post',
      postBody: doc,
      requestHeaders: { Accept: 'application/xml' },
      onSuccess: function(transport) { 
        this.setExternalId(transport.responseXML);
        this.addTag("jira");
      }.bind(this),
      onFailure: function() {
        alert("Failed to submit issue.");
      }.bind(this)
    });
    return false;
  },
  
  addTag: function(tag) {
	  if(typeof(ticketTagField) != 'undefined') {
	    ticketTagField.addEntry("jira", "jira");
	  };
  },
  
  setExternalId: function(responseXML) {
    var issues = JiraCustomHelper.getRecords(responseXML, "", "multiRef");

    if (issues.length > 0) {
      var key = XmlCustomHelper.getTextContentByKey(issues[0],'key');
      var doc = JiraCustomHelper.setExternalIdRequest(key);
      var url = '/tickets/' + this.ticketId + '.xml?_method=put';

      new Ajax.Request(url, {
        contentType: 'application/xml',
        method:'put',
        encoding: '',
        postBody: doc,
        onSuccess: function(transport) { this.contentRoot.update(JiraCustomHelper.getInJiraNotice(this.url, key)); }.bind(this),
        onFailure: function() { alert('failed'); }
      });
    } else {
      var faultString = XmlCustomHelper.getTextContentByKey(responseXML, 'faultstring');
      alert("Failed to retrieve JIRA issue key.\n\n(" + faultString + ")");
    }
  }
});

var div_name = 'jira_custom_widget';
var jira_custom_widget = new JiraCustomWidget({ id: $(div_name).readAttribute('id'),
                                                url: $(div_name).readAttribute('url'),
                                                username: $(div_name).readAttribute('username'),
                                                password: $(div_name).readAttribute('password'),
                                                ticketId: $(div_name).readAttribute('ticket_id'),
                                                externalId: $(div_name).readAttribute('external_id'),
                                                customFieldId: $(div_name).readAttribute('custom_field_id'),
                                                subject: $(div_name).readAttribute('subject'),
                                                description: $(div_name).readAttribute('description') });
