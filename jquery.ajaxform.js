/**
 * jQuery Plug-In: Ajax Form
 *
 * Copyright (c) 2014 Arnis Ritins
 * Released under the MIT license
 */
(function($){

	// jQuery Ajax Form
	$.fn.ajaxform = function(options){
	
		// Extends configuration values with options
		var config = $.extend({
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
		}, options);

		// Defines form objects
		var form = this,
			submit = this.find('[type=submit]'),
			loader = this.find(config.classes.loader).hide(),
			message = this.find(config.classes.message).hide();


		// Listens to form submit event
		form.on('submit', function(e){

			// Prevents default behavior of the event
			e.preventDefault();

			// Checks if confirmation is needed
			if(config.confirm && ! confirm(config.confirm))
				return;

			// Starts loading
			loading(true);

			// Makes AJAX request
			xhr().done(function(data){

				// Checks if redirect is needed
				if(data.redirect)

					// Redirects to specified URL
					return window.location.replace(data.redirect);

				else {

					// Fires form event depending on response status
					switch(data.status){
						case 'success':
							config.onFormSuccess(data.message);
						break;
						case 'error':
							config.onFormError(data.message, data.flags);
						break;
					}

					// Shows form message
					showMessage(data.status, data.message);

				}

				// Checks if form reset is needed
				if(data.reset){

					// Resets form fields
					resetForm();

					// Fires form reset event
					config.onFormReset(data.status);

				}

			});

		});


		/**
		 * Makes XML HTTP request
		 *
		 * @return object
		 */
		function xhr(){

			// Creates query string of additional form input data
			var data = ($.isEmptyObject(config.data)) ? '' : '&'+$.param(config.data);

			// Returns jQuery Ajax object
			return $.ajax({
				type: form.attr('method'),
				url: form.attr('action'),
				data: form.serialize() + data,
				cache: false,
				dataType: 'json'
			})
			.always(function(){

				// Ends loading
				loading(false);

			})
			.fail(function(){

				// Logs XHR error
				console.log('XHR failed!');

			});

		}


		/**
		 * Shows form message
		 *
		 * @param string
		 * @param string
		 * @return undefined
		 */
		function showMessage(status, text){

			// Sets message text and status
			message.text(text)
				.attr('class', config.classes.message.substring(1))
				.addClass(config.classes[status].substring(1));

			// Shows form message
			message.show();

			// Checks if jumping to form anchor is needed
			if(config.anchor){

				// Jumps to the form anchor
				window.location.hash = '';
				window.location.hash = form.attr('id');

			}

		}


		/**
		 * Handles form loading
		 *
		 * @param bool
		 * @return undefined
		 */
		function loading(load){

			if(load){

				// Shows loader and disables submit button
				loader.show();
				submit.attr('disabled', 'disabled');

			} else {
				
				// Hides loader and enables submit button
				loader.hide();
				submit.removeAttr('disabled');

			}

		}


		/**
		 * Resets all form fields
		 *
		 * @return undefined
		 */
		function resetForm(){

			// Clears form fields
			form.find('input:text, input:password, input:file, select, textarea').val('');

			// Unchecks and unselects form fields
			form.find('input:radio, input:checkbox')
				.removeAttr('checked')
				.removeAttr('selected');

		}

	};

}(jQuery));
