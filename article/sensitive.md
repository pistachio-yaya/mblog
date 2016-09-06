---
title:sensitive word
tags:sensitive
category:javascript
---

## filter sensitive word

简单的input为例的敏感词过滤

```
<!doctype html>
<html>
	<head>
		<title></title>	
	</head>
	<body>
		<input>
		<script>
			var input = document.getElementsByTagName("input")[0];
			console.log(input);
			var ciku = ["haha","hehe","heihei"];
			input.onkeyup = function(){
				for (var i=0;i<ciku.length;i++){
					var reg = new RegExp(ciku[i],"ig");
					console.log(reg);
					input.value = input.value.replace(reg,"*");
				}
			}
		</script>
	</body>
</html>
```
just a little case...

