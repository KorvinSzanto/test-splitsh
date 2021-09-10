(function(global, $) {

    document.addEventListener("DOMContentLoaded", function(){

        // Enable dropdown menu in navbar

        if (window.innerWidth > 992) {

            document.querySelectorAll('.ccm-block-top-navigation-bar .nav-item').forEach(function(everyitem){

                everyitem.addEventListener('mouseover', function(e){

                    let el_link = this.querySelector('a[data-concrete-toggle]');

                    if(el_link != null){
                        let nextEl = el_link.nextElementSibling;
                        el_link.classList.add('show');
                        nextEl.classList.add('show');
                    }

                });
                everyitem.addEventListener('mouseleave', function(e){
                    let el_link = this.querySelector('a[data-concrete-toggle]');

                    if(el_link != null){
                        let nextEl = el_link.nextElementSibling;
                        el_link.classList.remove('show');
                        nextEl.classList.remove('show');
                    }


                })
            });

        } else {

            $('a[data-concrete-toggle]').on('click', function(e) {
                if (!$(this).hasClass('show')) {
                    e.preventDefault()
                    let $nextEl = $(this).next();
                    $nextEl.addClass('show')
                    $(this).addClass('show')
                }
            })

        }

        // Enable transparency
        const $transparentNavbar = $('div[data-transparency=navbar]')
        const $toolbar = $('#ccm-toolbar')
        if ($transparentNavbar.length) {
            const $navbar = $transparentNavbar.find('.navbar')
            // Check the next item to see if it supports transparency

            if ($navbar.hasClass('fixed-top') && $toolbar.length > 0) {
                $navbar.removeClass('fixed-top')
            }

            const $nextElement = $transparentNavbar.next()
            if ($nextElement.length && $nextElement.is('[data-transparency=element]') && $toolbar.length === 0) {
                $transparentNavbar.addClass('transparency-enabled')

                if ($navbar.hasClass('fixed-top')) {
                    $(window).scroll(function() {
                        var isScrolled = $(document).scrollTop() > 5;
                        if (isScrolled) {
                            $transparentNavbar.removeClass('transparency-enabled')
                        } else {
                            $transparentNavbar.addClass('transparency-enabled')
                        }
                    })
                }
            }
            $transparentNavbar.show()

            // In phone mode, we need to hook into the expand/collapse event to remove transparency, because
            // we don't want to have transparency when the menu is expanded in phone mode.
            let $toggler = $transparentNavbar.find('[data-bs-toggle]')
            if ($toggler.length) {
                let $target = $($toggler.attr('data-bs-target'))
                $target.on('show.bs.collapse', function() {
                    $transparentNavbar.addClass('transparency-temporarily-disabled')
                })
                $target.on('hidden.bs.collapse', function() {
                    $transparentNavbar.removeClass('transparency-temporarily-disabled')
                })
            }
        }

        // Add padding to ccm-page if we're using the fixed bar.
        const $navbar = $('.ccm-block-top-navigation-bar .navbar')
        if ($navbar.hasClass('fixed-top')) {
            if ($transparentNavbar.length == 0 || !$transparentNavbar.hasClass('transparency-enabled')) {
                $('.ccm-page').css('padding-top', $navbar.outerHeight())
            }
        }
    });

})(window, $)
