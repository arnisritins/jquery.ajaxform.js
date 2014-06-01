# jQuery Plug-In: Ajax Form
Simple jQuery plug-in that helps to work with Ajax forms easily.

## Usage

### Create HTML form
```html
<form id="ajaxform" action="server.php" method="post">
	<div class="ajaxform-message"></div>
	
	<input type="text" name="username"/>
	<input type="submit" value="Submit"/>
	
	<span class="ajaxform-loader">Loading...</span>
</form>
```

### Include scripts
Include jQuery library (version 1.7 or higher):

```html
<script src="http://code.jquery.com/jquery-latest.min.js"></script>	
```

Include jQuery Ajax Form plug-in:
```html
<script src="jquery.ajaxform.js"></script>
```

### Initialize plug-in
```js
$('#ajaxform').ajaxform();
```

Initialize with specific options:
```js
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

### Server responses
Server have to return a form submission results as a JSON string

#### Success
```
{"status":"success","message":"Form submission succeed!"}
```

#### Error
```
{"status":"error","message":"Form submission failed!"}
```

#### Redirect
```
{"redirect":"success.html"}
```

#### Reset form after submission
```
{"status":"success","message":"Form submission succeed!","reset":true}
```
By default, form fields values are kept in form fields, but it's possible to clear all form by setting `reset` property as true.
