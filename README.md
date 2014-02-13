# jQuery Plug-In: Ajax Form
Simple jQuery plug-in that helps to work with Ajax forms easily.

# How to use?

## Create HTML form
```
&lt;form id=&quot;ajaxform&quot; action=&quot;server.php&quot; method=&quot;post&quot;&gt;

	&lt;div class=&quot;ajaxform-message&quot;&gt;&lt;/div&gt;
	
	&lt;input type=&quot;text&quot; name=&quot;email&quot;/&gt;
	&lt;input type=&quot;submit&quot; value=&quot;Submit&quot;/&gt;
	&lt;span class=&quot;ajaxform-loader&quot;&gt;Loading...&lt;/span&gt;

&lt;/form&gt;
```

## Include scripts

Include jQuery library (version 1.7 or higher):

```
&lt;script src=&quot;http://code.jquery.com/jquery-latest.min.js&quot;&gt;&lt;/script&gt;
```

Include jQuery Ajax Form plug-in:

```
&lt;script src=&quot;jquery.ajaxform.js&quot;&gt;&lt;/script&gt;
```

## Initialize plug-in

```
$('#ajaxform').ajaxform({
	anchor: false,
	confirm: false,
	data: {},
	classes: {
		loader: '.ajaxform-loader',
		message: '.ajaxform-message',
		success: '.ajaxform-success',
		error: '.ajaxform-error'
	},
	onFormReset: function(){},
	onFormSuccess: function(){},
	onFormError: function(){}
});
```
