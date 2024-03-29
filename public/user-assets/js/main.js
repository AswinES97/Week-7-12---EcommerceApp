
(function ($) {
    "use strict";
    // Page loading
    $(window).on('load', function () {
        $('#preloader-active').delay(450).fadeOut('slow');
        $('body').delay(450).css({
            'overflow': 'visible'
        });
        $("#onloadModal").modal('show');
    });
    /*-----------------
        Menu Stick
    -----------------*/
    var header = $('.sticky-bar');
    var win = $(window);
    win.on('scroll', function () {
        var scroll = win.scrollTop();
        if (scroll < 200) {
            header.removeClass('stick');
            $('.header-style-2 .categori-dropdown-active-large').removeClass('open');
            $('.header-style-2 .categori-button-active').removeClass('open');
        } else {
            header.addClass('stick');
        }
    });

    /*------ ScrollUp -------- */
    $.scrollUp({
        scrollText: '<i class="fi-rs-arrow-up"></i>',
        easingType: 'linear',
        scrollSpeed: 900,
        animation: 'fade'
    });

    /*------ Wow Active ----*/
    new WOW().init();

    //sidebar sticky
    if ($('.sticky-sidebar').length) {
        $('.sticky-sidebar').theiaStickySidebar();
    }

    // Slider Range JS 
    if ($("#slider-range").length) {
        $("#slider-range").slider({
            range: true,
            min: 0,
            max: 500,
            values: [130, 250],
            slide: function (event, ui) {
                $("#amount").val("$" + ui.values[0] + " - $" + ui.values[1]);
            }
        });
        $("#amount").val("$" + $("#slider-range").slider("values", 0) +
            " - $" + $("#slider-range").slider("values", 1));
    }

    /*------ Hero slider 1 ----*/
    $('.hero-slider-1').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        fade: true,
        loop: true,
        dots: true,
        arrows: true,
        prevArrow: '<span class="slider-btn slider-prev"><i class="fi-rs-angle-left"></i></span>',
        nextArrow: '<span class="slider-btn slider-next"><i class="fi-rs-angle-right"></i></span>',
        appendArrows: '.hero-slider-1-arrow',
        autoplay: true,
    });

    /*Carausel 6 columns*/
    $(".carausel-6-columns").each(function (key, item) {
        var id = $(this).attr("id");
        var sliderID = '#' + id;
        var appendArrowsClassName = '#' + id + '-arrows'

        $(sliderID).slick({
            dots: false,
            infinite: true,
            speed: 1000,
            arrows: true,
            autoplay: true,
            slidesToShow: 6,
            slidesToScroll: 1,
            loop: true,
            adaptiveHeight: true,
            responsive: [
                {
                    breakpoint: 1025,
                    settings: {
                        slidesToShow: 4,
                        slidesToScroll: 1,
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 1,
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ],
            prevArrow: '<span class="slider-btn slider-prev"><i class="fi-rs-angle-left"></i></span>',
            nextArrow: '<span class="slider-btn slider-next"><i class="fi-rs-angle-right"></i></span>',
            appendArrows: (appendArrowsClassName),
        });
    });

    /*Carausel 4 columns*/
    $(".carausel-4-columns").each(function (key, item) {
        var id = $(this).attr("id");
        var sliderID = '#' + id;
        var appendArrowsClassName = '#' + id + '-arrows'

        $(sliderID).slick({
            dots: false,
            infinite: true,
            speed: 1000,
            arrows: true,
            autoplay: true,
            slidesToShow: 4,
            slidesToScroll: 1,
            loop: true,
            adaptiveHeight: true,
            responsive: [
                {
                    breakpoint: 1025,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3,
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ],
            prevArrow: '<span class="slider-btn slider-prev"><i class="fi-rs-angle-left"></i></span>',
            nextArrow: '<span class="slider-btn slider-next"><i class="fi-rs-angle-right"></i></span>',
            appendArrows: (appendArrowsClassName),
        });
    });

    /*Fix Bootstrap 5 tab & slick slider*/

    $('button[data-bs-toggle="tab"]').on('shown.bs.tab', function (e) {
        $('.carausel-4-columns').slick('setPosition');
    });

    /*------ Timer Countdown ----*/

    $('[data-countdown]').each(function () {
        var $this = $(this), finalDate = $(this).data('countdown');
        $this.countdown(finalDate, function (event) {
            $(this).html(
                event.strftime(''
                    + '<span class="countdown-section"><span class="countdown-amount hover-up">%d</span><span class="countdown-period"> days </span></span>'
                    + '<span class="countdown-section"><span class="countdown-amount hover-up">%H</span><span class="countdown-period"> hours </span></span>'
                    + '<span class="countdown-section"><span class="countdown-amount hover-up">%M</span><span class="countdown-period"> mins </span></span>'
                    + '<span class="countdown-section"><span class="countdown-amount hover-up">%S</span><span class="countdown-period"> sec </span></span>'
                )
            );
        });
    });

    /*------ Product slider active 1 ----*/
    $('.product-slider-active-1').slick({
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
        fade: false,
        loop: true,
        dots: false,
        arrows: true,
        prevArrow: '<span class="pro-icon-1-prev"><i class="fi-rs-angle-small-left"></i></span>',
        nextArrow: '<span class="pro-icon-1-next"><i class="fi-rs-angle-small-right"></i></span>',
        responsive: [
            {
                breakpoint: 1199,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 991,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 575,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    });

    /*------ Testimonial active 1 ----*/
    $('.testimonial-active-1').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        fade: false,
        loop: true,
        dots: false,
        arrows: true,
        prevArrow: '<span class="pro-icon-1-prev"><i class="fi-rs-angle-small-left"></i></span>',
        nextArrow: '<span class="pro-icon-1-next"><i class="fi-rs-angle-small-right"></i></span>',
        responsive: [
            {
                breakpoint: 1199,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 991,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 1,
                }
            },
            {
                breakpoint: 575,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    });

    /*------ Testimonial active 3 ----*/
    $('.testimonial-active-3').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        fade: false,
        loop: true,
        dots: true,
        arrows: false,
        responsive: [
            {
                breakpoint: 1199,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 991,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 1,
                }
            },
            {
                breakpoint: 575,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    });

    /*------ Categories slider 1 ----*/
    $('.categories-slider-1').slick({
        slidesToShow: 6,
        slidesToScroll: 1,
        fade: false,
        loop: true,
        dots: false,
        arrows: false,
        responsive: [
            {
                breakpoint: 1199,
                settings: {
                    slidesToShow: 4,
                }
            },
            {
                breakpoint: 991,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 575,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    });

    /*----------------------------
        Category toggle function
    ------------------------------*/
    var searchToggle = $('.categori-button-active');
    searchToggle.on('click', function (e) {
        e.preventDefault();
        if ($(this).hasClass('open')) {
            $(this).removeClass('open');
            $(this).siblings('.categori-dropdown-active-large').removeClass('open');
        } else {
            $(this).addClass('open');
            $(this).siblings('.categori-dropdown-active-large').addClass('open');
        }
    })


    /*---------------------
        Price range
    --------------------- */
    var sliderrange = $('#slider-range');
    var amountprice = $('#amount');
    $(function () {
        sliderrange.slider({
            range: true,
            min: 16,
            max: 400,
            values: [0, 300],
            slide: function (event, ui) {
                amountprice.val("$" + ui.values[0] + " - $" + ui.values[1]);
            }
        });
        amountprice.val("$" + sliderrange.slider("values", 0) +
            " - $" + sliderrange.slider("values", 1));
    });

    /*-------------------------------
        Sort by active
    -----------------------------------*/
    if ($('.sort-by-product-area').length) {
        var $body = $('body'),
            $cartWrap = $('.sort-by-product-area'),
            $cartContent = $cartWrap.find('.sort-by-dropdown');
        $cartWrap.on('click', '.sort-by-product-wrap', function (e) {
            e.preventDefault();
            var $this = $(this);
            if (!$this.parent().hasClass('show')) {
                $this.siblings('.sort-by-dropdown').addClass('show').parent().addClass('show');
            } else {
                $this.siblings('.sort-by-dropdown').removeClass('show').parent().removeClass('show');
            }
        });
        /*Close When Click Outside*/
        $body.on('click', function (e) {
            var $target = e.target;
            if (!$($target).is('.sort-by-product-area') && !$($target).parents().is('.sort-by-product-area') && $cartWrap.hasClass('show')) {
                $cartWrap.removeClass('show');
                $cartContent.removeClass('show');
            }
        });
    }

    /*-----------------------
        Shop filter active 
    ------------------------- */
    $('.shop-filter-toogle').on('click', function (e) {
        e.preventDefault();
        $('.shop-product-fillter-header').slideToggle();
    })
    var shopFiltericon = $('.shop-filter-toogle');
    shopFiltericon.on('click', function () {
        $('.shop-filter-toogle').toggleClass('active');
    })

    /*-------------------------------------
        Product details big image slider
    ---------------------------------------*/
    $('.pro-dec-big-img-slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        draggable: false,
        fade: false,
        asNavFor: '.product-dec-slider-small , .product-dec-slider-small-2',
    });

    /*---------------------------------------
        Product details small image slider
    -----------------------------------------*/
    $('.product-dec-slider-small').slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        asNavFor: '.pro-dec-big-img-slider',
        dots: false,
        focusOnSelect: true,
        fade: false,
        arrows: false,
        responsive: [{
            breakpoint: 991,
            settings: {
                slidesToShow: 3,
            }
        },
        {
            breakpoint: 767,
            settings: {
                slidesToShow: 4,
            }
        },
        {
            breakpoint: 575,
            settings: {
                slidesToShow: 2,
            }
        }
        ]
    });

    /*-----------------------
        Magnific Popup
    ------------------------*/
    $('.img-popup').magnificPopup({
        type: 'image',
        gallery: {
            enabled: true
        }
    });

    /*---------------------
        Select active
    --------------------- */
    $('.select-active').select2();

    /*--- Checkout toggle function ----*/
    $('.checkout-click1').on('click', function (e) {
        e.preventDefault();
        $('.checkout-login-info').slideToggle(900);
    });

    /*--- Checkout toggle function ----*/
    $('.checkout-click3').on('click', function (e) {
        e.preventDefault();
        $('.checkout-login-info3').slideToggle(1000);
    });

    /*-------------------------
        Create an account toggle
    --------------------------*/
    $('.checkout-toggle2').on('click', function () {
        $('.open-toggle2').slideToggle(1000);
    });

    $('.checkout-toggle').on('click', function () {
        $('.open-toggle').slideToggle(1000);
    });


    /*-------------------------------------
        Checkout paymentMethod function
    ---------------------------------------*/
    paymentMethodChanged();
    function paymentMethodChanged() {
        var $order_review = $('.payment-method');

        $order_review.on('click', 'input[name="payment_method"]', function () {
            var selectedClass = 'payment-selected';
            var parent = $(this).parents('.sin-payment').first();
            parent.addClass(selectedClass).siblings().removeClass(selectedClass);
        });
    }

    /*---- CounterUp ----*/
    $('.count').counterUp({
        delay: 10,
        time: 2000
    });

    // Isotope active
    $('.grid').imagesLoaded(function () {
        // init Isotope
        var $grid = $('.grid').isotope({
            itemSelector: '.grid-item',
            percentPosition: true,
            layoutMode: 'masonry',
            masonry: {
                // use outer width of grid-sizer for columnWidth
                columnWidth: '.grid-item',
            }
        });
    });

    /*====== SidebarSearch ======*/
    function sidebarSearch() {
        var searchTrigger = $('.search-active'),
            endTriggersearch = $('.search-close'),
            container = $('.main-search-active');

        searchTrigger.on('click', function (e) {
            e.preventDefault();
            container.addClass('search-visible');
        });

        endTriggersearch.on('click', function () {
            container.removeClass('search-visible');
        });

    };
    sidebarSearch();

    /*====== Sidebar menu Active ======*/
    function mobileHeaderActive() {
        var navbarTrigger = $('.burger-icon'),
            endTrigger = $('.mobile-menu-close'),
            container = $('.mobile-header-active'),
            wrapper4 = $('body');

        wrapper4.prepend('<div class="body-overlay-1"></div>');

        navbarTrigger.on('click', function (e) {
            e.preventDefault();
            container.addClass('sidebar-visible');
            wrapper4.addClass('mobile-menu-active');
        });

        endTrigger.on('click', function () {
            container.removeClass('sidebar-visible');
            wrapper4.removeClass('mobile-menu-active');
        });

        $('.body-overlay-1').on('click', function () {
            container.removeClass('sidebar-visible');
            wrapper4.removeClass('mobile-menu-active');
        });
    };
    mobileHeaderActive();


    /*---------------------
         Mobile menu active
     ------------------------ */
    var $offCanvasNav = $('.mobile-menu'),
        $offCanvasNavSubMenu = $offCanvasNav.find('.dropdown');

    /*Add Toggle Button With Off Canvas Sub Menu*/
    $offCanvasNavSubMenu.parent().prepend('<span class="menu-expand"><i class="fi-rs-angle-small-down"></i></span>');

    /*Close Off Canvas Sub Menu*/
    $offCanvasNavSubMenu.slideUp();

    /*Category Sub Menu Toggle*/
    $offCanvasNav.on('click', 'li a, li .menu-expand', function (e) {
        var $this = $(this);
        if (($this.parent().attr('class').match(/\b(menu-item-has-children|has-children|has-sub-menu)\b/)) && ($this.attr('href') === '#' || $this.hasClass('menu-expand'))) {
            e.preventDefault();
            if ($this.siblings('ul:visible').length) {
                $this.parent('li').removeClass('active');
                $this.siblings('ul').slideUp();
            } else {
                $this.parent('li').addClass('active');
                $this.closest('li').siblings('li').removeClass('active').find('li').removeClass('active');
                $this.closest('li').siblings('li').find('ul:visible').slideUp();
                $this.siblings('ul').slideDown();
            }
        }
    });

    /*--- language currency active ----*/
    $('.mobile-language-active').on('click', function (e) {
        e.preventDefault();
        $('.lang-dropdown-active').slideToggle(900);
    });

    /*--- Categori-button-active-2 ----*/
    $('.categori-button-active-2').on('click', function (e) {
        e.preventDefault();
        $('.categori-dropdown-active-small').slideToggle(900);
    });

    /*--- Mobile demo active ----*/
    var demo = $('.tm-demo-options-wrapper');
    $('.view-demo-btn-active').on('click', function (e) {
        e.preventDefault();
        demo.toggleClass('demo-open');
    });

    /*-----More Menu Open----*/
    $('.more_slide_open').slideUp();
    $('.more_categories').on('click', function () {
        $(this).toggleClass('show');
        $('.more_slide_open').slideToggle();
    });

    $('.modal').on('shown.bs.modal', function (e) {
        $('.product-image-slider').slick('setPosition');
        $('.slider-nav-thumbnails').slick('setPosition');
        $('.product-image-slider .slick-active img').elevateZoom({
            zoomType: "inner",
            cursor: "crosshair",
            zoomWindowFadeIn: 500,
            zoomWindowFadeOut: 750
        });
    })

    /*--- VSticker ----*/
    $('#news-flash').vTicker({
        speed: 500,
        pause: 3000,
        animation: 'fade',
        mousePause: false,
        showItems: 1
    });

})(jQuery);


function getPriceAndQuantity(slug) {
    const quantity = $('td').find(`[data-id="${slug}"]`).text()
    let price = $('td').find(`[data-title="${slug}"]`).text();
    price = price.split('₹')
    return {
        quantity: Number(quantity),
        price: Number(price[1])
    }
}

// cart

$('#addToCart').click(() => {
    const quantity = $('#qty').text().trim()
    const size = $('#size').text().trim()
    let pId = window.location.search.split("=")
    pId = pId[pId.length - 1]

    $('#addToCart').prop('disabled', true)
    $.ajax({
        url: '/v1/users/cart',
        type: 'POST',
        data: {
            pId,
            size,
            quantity
        },
        success: (res) => {
            $('#cart-count').text(res.cartC)
            swal('Success', 'added to cart', 'success')
            $('#addToCart').prop('disabled', false)
        },
        error: (err) => {
            console.log("err", err);
        }
    })
})

function deleteItem(slug, pId) {
    swal('Remove Item', 'Are you sure you want to remove this item?', 'warning', {
        buttons: {
            cancel: "Cancel",
            catch: {
                text: "Remove",
                value: true,
            }
        }
    }).then((result) => {
        if (result) {
            let { price, quantity } = getPriceAndQuantity(slug)
            price = price * quantity
            $.ajax({
                url: '/v1/users/cart/',
                type: 'PUT',
                data: {
                    pId,
                    price: price
                },
                success: (res) => {
                    window.location.reload()
                },
                error: (err) => {
                    swal('Error Deleting Item!')
                }
            })
        }
    });
}

$('#clear-cart').click(() => {
    swal('Are you sure?', {
        buttons: {
            cancel: "Cancel",
            catch: {
                text: "Remove",
                value: true,
            }
        }
    }).then(result => {
        if (result) {
            $.ajax({
                url: '/v1/users/cart',
                type: 'DELETE',
                success: (res) => {
                    window.location.reload()
                },
                error: (err) => {
                    swal(err.responseText.err)
                }
            })
        }
    })
})

function changeQuantityAjax(price, pId, quantity, slug) {
    return $.ajax({
        url: '/v1/users/cart',
        type: 'PATCH',
        data: {
            price,
            pId,
            quantity
        },
        success: (res) => {
            $(`#subTotal-${slug}`).html(`${res.subTotal}`)
            $('.grandTotal').html(`${res.grandTotal}`)
            $('td').find(`[data-id="${slug}"]`).html(`${res.quantity}`)
        },
        error: (err) => {
            swal(err.responseJSON.err)

        }
    })
}

function qtychange(slug, pId, qty) {

    let { price, quantity } = getPriceAndQuantity(slug)
    if (Number(qty) < 0) price = -1 * Number(price)
    if (Number(quantity) >= 0 && qty === 1) {
        return changeQuantityAjax(price, pId, qty, slug)
    } else if (Number(quantity) > 1 && qty === -1) {
        return changeQuantityAjax(price, pId, qty, slug)
    }
}

// address

$('#address-tab').on('click', () => {
    $.get('/v1/users/address', (data, status) => {
        let content = ''
        data.ok.forEach(ele => {
            content += `
            <div class="col-lg-6" id='${ele.addressId}'>
            <div class="card mb-3 mb-lg-0">
                <div class="card-body">
                    <h4>${ele.name}</h4>
                    <address>${ele.address1}<br>${ele.city} ,<br>${ele.state}<br>${ele.country}, ${ele.postal_code}</address>
                    <address>${ele.phone}</address>
                    <button onclick="editaddress('${ele.addressId}','dash')" class="btn">Edit</button> 
                    <button onclick="deleteaddress('${ele.addressId}')" class="btn" style="background-color:red">Delete</button>
                </div>
            </div>
            </div>

            `
        })
        $('#address-tab-body').html(content)
    })
})

function createAddressCardForDash(data) {
    return `<div class="card mb-3 mb-lg-0 id=${data.addressId}">
    <div class="card-body">
        <h4>${data.name}</h4>
        <address>${data.address1}<br>${data.city} ,<br>${data.state}<br>${data.country}, ${data.postal_code}</address>
        <address>${data.phone}</address>
        <button onclick="editaddress('${data.addressId}','dash')" class="btn">Edit</button>
        <button onclick="deleteaddress('${data.addressId}')" class="btn" style="background-color:red">Delete</button>
    </div>
</div>
    `
}

function changeAddressCard(data, id, from) {
    if (from === 'dash') {
        $(`#${id}`).html(createAddressCardForDash(data))
        swal('Updated')
        setTimeout(() => {
            $('#staticBackdrop').modal('hide')
        }, 500);
    } else if (from === 'checkout') {
        window.location.reload()
    }


}

function addAddressCard(data, from) {
    if (from === 'dash') {
        $(`<div class="col-lg-6" id="${data.addressId}">
    ${createAddressCardForDash(data)}
    </div>
    `).appendTo('#address-tab-body')
        swal('Added new address!')
        setTimeout(() => {
            $('#staticBackdrop').modal('hide')
        }, 500);
    } else if (from === 'checkout') {
        window.location.reload()
    }


}

async function addAndUpdateAddressAjax(method, data, from) {
    await fetch(`/v1/users/address/`, {
        method,
        body: JSON.stringify(data),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        }
    })
        .then(response => response.json())
        .then(response => {
            [response] = response.ok

            if (data.addressId) changeAddressCard(response, data.addressId, from)
            else addAddressCard(response, from)
        })
        .catch(error => swal(error));
}

function addAndUpdateAddress(addressId, cb, from) {
    const formData = $('#address-form').serializeArray();
    let data = { addressId }
    formData.forEach(ele => {
        data[ele.name] = ele.value
    })

    if (addressId) cb("PUT", data, from)
    else cb("POST", data, from)
}

function formSubmit(event, addressId = null, from = null) {
    event.preventDefault();
    addAndUpdateAddress(addressId, addAndUpdateAddressAjax, from)
}

function clearmodel(from) {
    $('#form-name-field').val('')
    $('#form-address1-field').val('')
    $('#form-address2-field').val('')
    $('#form-city-field').val('')
    $('#form-state-field').val('')
    $('#form-country-field').val('')
    $('#form-pincode-field').val('')
    $('#form-phone-field').val('')
    $('#form-save-field').attr('onclick', `formSubmit(event,null,'${from}')`)
    $('#staticBackdrop').modal('show')
}

async function editaddress(addressId, from) {
    await fetch(`/v1/users/address/${addressId}`)
        .then(res => res.text())
        .then(res => JSON.parse(res))
        .then(data => {
            [data] = data.ok
            $('#form-name-field').val(data.name)
            $('#form-address1-field').val(data.address1)
            $('#form-address2-field').val(data.address2)
            $('#form-city-field').val(data.city)
            $('#form-state-field').val(data.state)
            $('#form-country-field').val(data.country)
            $('#form-pincode-field').val(data.postal_code)
            $('#form-phone-field').val(data.phone)
            $('#staticBackdrop').modal('show')
            $('#form-save-field').attr('onclick', `formSubmit(event,'${addressId}','${from}')`)

        })
        .catch(err => {
            swal(err.responseJSON.err)
        })
}


function deleteaddress(addressId) {

    swal('Remove Address', 'Are you sure you ?', 'warning', {
        buttons: {
            cancel: "Cancel",
            catch: {
                text: "Remove",
                value: true,
            }
        }
    }).then((result) => {
        if (result) {
            fetch(`/v1/users/address/${addressId}`, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    $(`#${data.ok}`).remove()
                })
                .catch(err => swal(err.responseJSON.err))
        }
    })




}

// orders-tab dash
$('#orders-tab').click(() => {
    const url = '/v1/users/order/dash'
    const headers = {
        'Content-Type': 'application/json'
    }
    commonAjax(url, 'GET', headers, null)
        .then(res => {
            let tr = '';
            res.data.forEach(ele => {
                tr += `
                <tr>
                <td>${ele.orderId}</td>
                <td>${ele.orderDate}</td>`
                if (ele.orderStatus === 'Delivered') tr += `<td><span class="badge rounded-pill alert-success">${ele.orderStatus}</span></td>`
                else tr += `<td><span class="badge rounded-pill alert-danger">${ele.orderStatus}</span></td>`
                tr += `<td><a href="/v1/users/dashboard/single-order?oId=${ele.orderId}" class="btn-small d-block">View</a></td>
                </tr>
                `
            });
            $('#order-table').html(tr)
        })
        .catch(err => {
            swal(err.data)
        })

})

// add product cart
function addFromLanding(pId) {
    $.ajax({
        url: '/v1/users/cart',
        type: 'POST',
        data: {
            pId
        },
        success: (res) => {
            $('#cart-count').text(res.cartC)
            swal("Added to Cart!", "Success!", {
                toast: 'true',
                timer: 1000
            })
        },
        error: (err) => {
            swal('Error Adding to cart')
        }
    })
}

// place order
// Razorpay
const verifyPayment = (payment, order) => {
    $.ajax({
        type: "post",
        url: './checkout/verify-payment',
        data: {
            payment,
            order
        },
        success: (response) => {
            swal('Payment Successful!')
            setTimeout(() => {
                location.href = `/v1/users/order?oId=${response.orderId}`
            }, 500)
        },
        error: (err) => {
            swal(err.responseJSON)
            setTimeout(() => {
                location.href = '/'
            }, 500)
        }
    })
}

const getRazorpay = (order) => {
    var options = {
        "key": "rzp_test_QwyctMFGRE9AVS", // Enter the Key ID generated from the Dashboard
        "amount": order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        "currency": "INR",
        "name": "Punch", //your business name
        "description": "Test Transaction",
        "order_id": order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        "handler": function (response) {
            verifyPayment(response, order);
        },
        "prefill": {
            "name": "Gaurav Kumar", //your customer's name
            "email": "gaurav.kumar@example.com",
            "contact": "9000090000"
        },
        "notes": {
            "address": "Razorpay Corporate Office"
        },
        "theme": {
            "color": "#3399cc"
        }
    };
    var rzp1 = new Razorpay(options);
    rzp1.on('payment.failed', function (response) {
        swal(response.error.code);
        swal(response.error.description);
        swal(response.error.source);
        swal(response.error.step);
        swal(response.error.reason);
        swal(response.error.metadata.order_id);
        swal(response.error.metadata.payment_id);
    });

    rzp1.open();
}
// cod + place order
$('#placeorder').click(async (event) => {
    event.preventDefault()
    const selectedAddress = $('input[name="address"]:checked').val()
    const selectedPayment = $('input[name="payment_option"]:checked').val()
    const headers = {
        'Content-Type': 'application/json'
    }

    if (selectedPayment === 'cod') {

        await commonAjax('/v1/users/checkout/', 'POST', headers, { selectedAddress, selectedPayment })
            .then(res => JSON.parse(JSON.stringify(res)))
            .then(res => {
                window.location.assign(`/v1/users/order?oId=${res.orderId}`)
            })
            .catch(err => {
                console.log(err);
                swal(err.orderStatus)
            })
    }

    if (selectedPayment === 'Razorpay') {

        await commonAjax('/v1/users/checkout/', 'POST', headers, { selectedAddress, selectedPayment })
            .then(res => {
                getRazorpay(res.order)
            })
            .catch(err => {
                console.log(err);
                swal(err.orderStatus)
            })
    }
})

// dashboard-account-details
$('#account-detail-tab').on('click', async () => {
    let data = await fetch('./dashboard/user-details')
        .then(res => res.json())
        .catch(err => err.json())

    if (data.ok) {
        $('#fname').val(data.fname)
        if (!!data.lname) $('#lname').val(data.lname)
        $('#email').val(data.email)
        $('#phone').val(data.phn_no)
    } else {
        swal(data.data)
    }
})

$("#disable-btn").on('click', () => {
    $("#fname").prop('disabled', !$("#fname").prop('disabled'));
    $("#lname").prop('disabled', !$("#lname").prop('disabled'));
    $("#email").prop('disabled', !$("#email").prop('disabled'));
    $("#phone").prop('disabled', !$("#phone").prop('disabled'));
    $("#submit-btn").toggle();
})

$('#change-password-btn').on('click', () => {
    $('#change-password-fields').toggle()
})

$('#userInfo').submit((e) => {
    e.preventDefault()
    console.log('submitted');
})

$('#change-password').submit(e => {
    e.preventDefault()
})

// wishllist
async function wishlitBtn(e, slug) {
    e.preventDefault()
    const headers = {
        'Content-Type': 'application/json'
    }
    const body = {
        slug
    }
    await commonAjax('/v1/users/wishlist', 'POST', headers, body)
        .then(res => {
            swal(res.data.text)
            $('#wishlist-count').text(res.data.newWishlistCount)
        })
        .catch(err => {
            swal(err.data)
        })
}

//remove from wishlist

async function removeFromWishlist(e, slug) {
    e.preventDefault()
    const headers = {
        'Content-Type': 'application/json'
    }
    const body = {
        slug: slug
    }

    await commonAjax('/v1/users/wishlist', 'PUT', headers, body)
        .then(res => {
            swal(res.data)
            setTimeout(() => {
                window.location.reload()
            }, 750);
        })
        .catch(err => {
            swal(err.data)
            setTimeout(() => {
                window.location.reload()
            }, 750);
        })
}

// order cancel

$("#form-cancel-order").on('click', async (event) => {
    event.preventDefault()
    const headers = {
        'Content-type': 'application/json'
    }
    const msg = $('input[name=cancel]:checked').val().trim()
    const oId = window.location.search.split('=')[1]

    await commonAjax('/v1/users/dashboard/single-order', 'PUT', headers, { oId, msg })
        .then(res => {
            swal(res.data)
            setTimeout(() => {
                location.reload()
            }, 1000);
        })
        .catch(err => {
            swal(err.data)
            setTimeout(() => {
                location.reload()
            }, 1000);
        })
})

$('#form-return-order').on('click', async (event) => {
    event.preventDefault()
    const headers = {
        "Content-Type": "application/json"
    }
    const msg = $('input[name=return]:checked').val().trim()
    const oId = window.location.search.split('=')[1]

    // TODO: check date in backend for return verify, do backend return and wishlisht update
    await commonAjax('/v1/users/dashboard/order-return', 'POST', headers, { msg, oId })
        .then(res => {
            swal(res.data)
            setTimeout(() => {
                location.reload()
            }, 1000);
        })
        .catch(err => {
            swal(err.data)
            setTimeout(() => {
                location.reload()
            }, 1000);
        })
})

// pagination
async function pagination(e, skip, data) {
    e.preventDefault()
    $('#pagination-list').find('li').removeClass('active')
    const headers = {
        "Content-type": "application/json"
    }
    const skipNo = skip * 10

    await commonAjax(`/v1/users/pagination?skip=${skipNo}&category=${data.category}`, 'GET', headers)
        .then(res => {
            $('#shop-products').html(res.data)
            $('#pagination-list li').filter(`[data-id='${skip}']`).addClass('active')
        })
        .catch(err => {
            swal(err.data)
        })
}

// category filter
async function categoryFilter(e, category, categoryType) {
    e.preventDefault()
    const headers = {
        "Content-type": "application/json"
    }

    await commonAjax(`/v1/users/shop/categoryFilter?category=${category}&categoryType=${categoryType}`, 'GET', headers)
        .then(res => {
            if (res.pcount < 10) $('#shop-pagination').css('display', 'none')
            $('#shop-products').html(res.data)
        })
        .catch(err => {
            swal(err.data)
        })
}

// wallet

$('#user-wallet').on('click',async(event)=>{
    event.preventDefault()
    const headers = {
        'Content-Type': 'application/json'
    }
    await commonAjax('/v1/users/wallet','GET',headers)
            .then(res=>{
                $('#walletBalance').val(res.data.balance)
                $('#walletModal').modal('show')
            })
            .catch(err=>{
                swal(err.data)
            })
})

// product search

$('#search-bar').on('keydown',async(event)=>{
    $('#search-error').attr('hidden', true)
    const code = event.which || event.keyCode || event.charCode;

    if(code === 13){
        event.preventDefault()
        const val = $('#search-bar').val().trim()
        if(val.length != 0){
            $('#search-form').submit()
        }else{
            $('#search-error').attr('hidden', false)
        }

    }
})