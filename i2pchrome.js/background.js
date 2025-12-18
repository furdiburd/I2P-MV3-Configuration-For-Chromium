function platformCallback(platformInfo) {
  if (platformInfo.PlatformOs == "android") {
    console.log("android detected");
    return true;
  } else {
    console.log("desktop detected");
    return false;
  }
}

function isDroid() {
  return chrome.runtime.getPlatformInfo(platformCallback);
}

function isLocalHost(url) {
  //var x = new RegExp("/(^127\.)|(^192\.168\.)|(^10\.)|(^172\.1[6-9]\.)|(^172\.2[0-9]\.)|(^172\.3[0-1]\.)|(^::1$)|(^[fF][cCdD])/")
  var r = false; ///(^127\.)|(^192\.168\.)|(^10\.)|(^172\.1[6-9]\.)|(^172\.2[0-9]\.)|(^172\.3[0-1]\.)|(^::1$)|(^[fF][cCdD])/.test(url)
  if (r == false) {
    r = url.indexOf("://localhost:") != -1;
  }
  if (r == false) {
    r = url.indexOf("://127.0.0.1:") != -1;
  }
  console.log("localhost:", r, "on url", url);
  return r;
}

function isRouterHost(url) {
  var controlPort = 7657; //getControlPort();
  var r = false;
  if (r == false) {
    r = url.indexOf("://localhost:" + controlPort) != -1;
  }
  if (r == false) {
    r = url.indexOf("://127.0.0.1:" + controlPort) != -1;
  }
  console.log("routerhost:", r, "on url", url);
  return r;
}

function setupBrowsingGroup(groupid){
	if (groupid && chrome.tabGroups) {
		chrome.tabGroups.update(groupid, {color: "yellow", title: "I2P Browsing"}).catch(err => {
			console.log("Tab group update failed:", err);
		});
	}
}

chrome.webRequest.onBeforeRequest.addListener(
  function(details) { 
	if (typeof details.tabId !== 'number' || details.tabId < 0) {
	  return;
	}
	if (chrome.tabs.group) {
		chrome.tabs.group({tabIds: [details.tabId]}, setupBrowsingGroup);
	}
	console.log(details);
	return ;//{cancel: true}; 
	},
  {urls: ["*://*.i2p/*"]}
);
