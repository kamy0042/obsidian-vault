---
タグ: []
作成日時: 2023-08-24T23:39:00
URL: https://forum.figma.com/t/rest-api-get-color-and-text-styles/49216/1
Tags: [topic/ツール/Figma]
---
![[7ca348f6d77c80ebcdcce80a7dd06a587a78fc3c.png]]

Hi all! Is there a way to get color and text styles data from the REST API? I’m using the `/v1/files/:key/nodes?ids=:ids` endpoint, and the response on `nodes > [node id] > styles` returns all color and text styles but only metadata, nothing related to font family, font size, color etc. Is this expected? I know that I can get those styles if I look for an specific element that is assigned to those styles, but that won’t always be the case, for example, if I have 10 text styles but only 5 are being used on a file, I’d still want info from all of them. I also tried using `/v1/styles/:key` but for some reason it always returns 404, and by looking at the documentation, it also only returns metadata and not the actual styling information. On the Plugin API I can just use `figma.getLocalPaintStyles()` and `figma.getLocalTextStyles()`, so is there something similar to this on the REST API?

Hi all! Is there a way to get color and text styles data from the REST API? I’m using the  endpoint, and the response on  returns all color and text styles but only metadata, nothing related to font family, font size, color etc. Is this expected? I know that I can get those styles if I look for an specific element that is assigned to those styles, but that won’t always be the case, for example, if I have 10 text styles but only 5 are being used on a file, I’d still want info from all of them. I also tried using  but for some reason it always returns 404, and by looking at the documentation, it also only returns metadata and not the actual styling information. On the Plugin API I can just use  and , so is there something similar to this on the REST API?