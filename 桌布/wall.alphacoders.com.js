// ==UserScript==
// @name        New script alphacoders.com
// @namespace   Violentmonkey Scripts
// @match       https://wall.alphacoders.com/by_sub_category.php
// @grant       none
// @version     1.0
// @author      -
// @description 2022/9/23 下午2:18:08
// ==/UserScript==

var downloadImage = async (imgSrc) => {
  var linkDom = document.querySelector('#jay_use_download_link');
  linkDom.href = imgSrc;
  linkDom.click();
}

var buildButtonHTML = (imgSrc) => {
  return `
  <a class="jay_use" style="position: absolute;right: 0px;bottom: 0px;color: green;padding-right: 6px;cursor: pointer;" onclick="downloadImage('${imgSrc}')">
    Download
  </a>`;
}

var getDownloadLink = async (payload) => {
  return fetch('https://api.alphacoders.com/content/get-download-link', {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      'content-type': 'application/json',
      'accept': '*/*'
    },
  });
}

var action = async () => {
  var imageContainers = document.querySelectorAll('.thumb-container-big')

  for (var imageContainer of imageContainers) {
    try {
      // Check
      var checkProcessedDom = imageContainer.querySelectorAll('.jay_use');
      if (checkProcessedDom.length > 0) {
        continue;
      }

      // Prepare Download Link Payload
      var imgDom = imageContainer.querySelectorAll('img');
      var imgSrc = imgDom[0].src;
      var uri = new URL(imgSrc);
      var host = uri.host;
      var splittedHost = host.split('.')
      var imageServer = splittedHost[0]
      var splittedImgSrcByDot = imgSrc.split('.');
      var splittedImgSrcBySlash = imgSrc.split('/');
      var ext = splittedImgSrcByDot[splittedImgSrcByDot.length - 1];
      var fileNameWithExt = splittedImgSrcBySlash[splittedImgSrcBySlash.length - 1];
      var contentId = fileNameWithExt.split('.')[fileNameWithExt.split('.').length - 2]
      var payload = {
        "content_id": contentId,
        "content_type": "wallpaper",
        "file_type": ext,
        "image_server": imageServer
      }

      // Download Link
      const res = await getDownloadLink(payload);
      const resJson = await res.json();
      if (resJson.status == 'failure') {
        console.error('failure =>>> ', JSON.stringify(payload));
        throw new Error(payload);
      }

      imageContainer.innerHTML = imageContainer.innerHTML + buildButtonHTML(resJson.link);
    } catch (e) {
      imageContainer.innerHTML = imageContainer.innerHTML + '<b style="color: red">失敗</b>';
      console.error('執行腳本失敗');
    }
  }
}

var main = () => {
  document.body.innerHTML += '<a id="jay_use_download_link" target="_blank"></a>';

  setInterval(() => {
    action();
  }, 2000);
}

main();