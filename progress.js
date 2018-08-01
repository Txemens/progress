(function ($) {
    $.progress = function (options) {
        var prop = {
            $element: $(),
            valuenow: 50,
            valuemin: 100,
            valuemax: 100,
            $container: $(),
            value: 0,
            classBar: ''
        }
        var method = {
            createContainer: function () {
                let $a = $('.progress');
                if ($a.length > 0) {
                    prop.$container = $a;
                } else {
                    prop.$container = $('<div class="progress fixed-top"></div>');
                }
            },

            createBar: function () {
                let $a = $('#loading-bar');
                if ($a.length > 0) {
                    prop.$element = $a;
                } else {
                    prop.$element = $('<div></div>')
                        .attr('id', "loading-bar").attr('role', "progressbar")
                        .attr('aria-valuenow', prop.valuenow)
                        .attr('aria-valuemin', prop.valuemin)
                        .attr('aria-valuemax', prop.valuemax)
                        .addClass("progress-bar progress-bar-striped progress-bar-animated " + prop.classBar)
                        .html(prop.value);
                }
            },
            changeValues: function () {
                if (typeof prop.value === 'number') {
                    if (prop.value > 100) prop.value = 100;
                    // prop.$element.css('width', prop.value);
                    prop.$element.css('width', '100%');
                    percentage = Math.round(prop.value);
                    prop.$element.html(prop.value + '%');
                } else {
                    prop.$element.html(prop.value);
                }

                prop.$element.toggleClass(prop.classBar);

                prop.$element.attr('id', "loading-bar")
                    .attr('aria-valuenow', prop.valuenow)
                    .attr('aria-valuemin', prop.valuemin)
                    .attr('aria-valuemax', prop.valuemax)
            },

            show: function () {
                prop.$container.show();
            },

            hide: function () {
                prop.$container.hide();
            },

            checkAndCreateContainer: function () {
                method.createContainer();
                method.createBar();
                let $a = $('#loading-bar');

                if ($a.length < 1) {
                    prop.$container.append(prop.$element);
                    $('body').append(prop.$container);
                }
            },

            _init: function (options) {
                method.checkAndCreateContainer();
                if (typeof options !== 'undefined') {
                    if (typeof options === 'string') {
                        method[options]();
                    } else if (typeof options === 'object') {
                        if (Object.keys(options).length > 0) {
                            $.each(options, function (k, v) {

                                if (typeof prop[k] !== 'undefined') {
                                    prop[k] = v;
                                }
                            });


                            method.changeValues();

                        }
                    }

                }
            }
        }
        method._init(options);
    }

})(jQuery);
