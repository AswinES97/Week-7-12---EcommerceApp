
!function (e) { "use strict"; if (e(".menu-item.has-submenu .menu-link").on("click", function (s) { s.preventDefault(), e(this).next(".submenu").is(":hidden") && e(this).parent(".has-submenu").siblings().find(".submenu").slideUp(200), e(this).next(".submenu").slideToggle(200) }), e("[data-trigger]").on("click", function (s) { s.preventDefault(), s.stopPropagation(); var n = e(this).attr("data-trigger"); e(n).toggleClass("show"), e("body").toggleClass("offcanvas-active"), e(".screen-overlay").toggleClass("show") }), e(".screen-overlay, .btn-close").click(function (s) { e(".screen-overlay").removeClass("show"), e(".mobile-offcanvas, .show").removeClass("show"), e("body").removeClass("offcanvas-active") }), e(".btn-aside-minimize").on("click", function () { window.innerWidth < 768 ? (e("body").removeClass("aside-mini"), e(".screen-overlay").removeClass("show"), e(".navbar-aside").removeClass("show"), e("body").removeClass("offcanvas-active")) : e("body").toggleClass("aside-mini") }), e(".select-nice").length && e(".select-nice").select2(), e("#offcanvas_aside").length) { const e = document.querySelector("#offcanvas_aside"); new PerfectScrollbar(e) } e(".darkmode").on("click", function () { e("body").toggleClass("dark") }) }(jQuery);

// category loading
async function categoryInitialDisplay() {
    return await $.ajax({
        url: 'http://localhost:3000/v1/admin/category/all',
        type: 'GET',
        success: async (data) => {
            return data
        },
        error: (err) => { }
    })
}

function option(data, editDefault = undefined) {
    const { category, subCategory, categoryType } = data
    let categoryValue, subCategoryValue, categoryTypeValue;
    if (editDefault) {
        categoryValue = editDefault.categoryValue
        subCategoryValue = editDefault.subCategoryValue
        categoryTypeValue = editDefault.categoryTypeValue
    }

    let optionCategory = ''
    let optionSubCategory = ''
    let optionCategoryType = ''

    if (category) {
        category.forEach(ele => {
            if (ele == categoryValue) {
                optionCategory += `<option selected value="${ele}">${ele}</option>`
            } else {
                optionCategory += `<option value="${ele}">${ele}</option>`
            }
        });
        $('#category').html(
            `<select name="category" id="category">
                            ${optionCategory}
                        </select>`
        )
    }

    if (subCategory) {
        subCategory.forEach(ele => {
            if (ele == subCategoryValue) {
                optionSubCategory += `<option selected value="${ele}">${ele}</option>`
            } else {
                optionSubCategory += `<option value="${ele}">${ele}</option>`
            }
        })

        $('#sub-category').html(
            `<select name="subCategory" id="sub-category">
                            ${optionSubCategory}
                        </select>`
        )
    }

    if (categoryTypeValue) {

        categoryTypeValue.forEach(ele => {
            if (ele == categoryTypeValue) {
                optionCategoryType += `<option selected value="${ele}">${ele}</option>`
            } else {
                optionCategoryType += `<option value="${ele}">${ele}</option>`
            }

        })

    } else {

        categoryType.forEach(ele => {
            optionCategoryType += `<option value="${ele}">${ele}</option>`
        })

        $('#category-type').html(
            `<select name="categoryType" id="category-type">
                            ${optionCategoryType}
                        </select>`
        )
    }
}

$(document).ready(async function () {
    let productId = document.location.pathname.split('/')
    productId = productId[productId.length - 1]

    if (document.location.href == 'http://localhost:3000/v1/admin/products/add-product') {
        const data = await categoryInitialDisplay()
        console.log(data);
        option(data)
    }

    if (document.location.href == `http://localhost:3000/v1/admin/products/${productId}`) {
        const categoryValue = $('#category').val()
        const subCategoryValue = $('#sub-category').val()
        $.ajax({
            url: 'http://localhost:3000/v1/admin/category/all',
            type: 'GET',
            data: {
                categoryValue,
                subCategoryValue
            },
            success: async (data) => {

                const initial = await categoryInitialDisplay()

                data = {
                    categoryValue,
                    subCategoryValue,
                    categoryTypeValue: data
                }

                option(initial, data)
            },
            error: () => {

            }

        })

    }

    if (document.location.href == 'http://localhost:3000/v1/admin/category') {
        const data = await categoryInitialDisplay()
        option(data)
    }
})

$('#category').change(async () => {
    const category = $('#category').val()

    $.ajax({
        url: 'http://localhost:3000/v1/admin/category/all',
        type: 'GET',
        data: {
            category,
        },
        success: (data) => {
            option(data)
        },
        error: () => {

        }

    })
})

$('#sub-category').change(async () => {
    const categoryValue = $('#category').val()
    const subCategoryValue = $('#sub-category').val()

    await $.ajax({
        url: 'http://localhost:3000/v1/admin/category/all',
        type: 'GET',
        data: {
            categoryValue,
            subCategoryValue
        },
        success: (data) => {
            let option = ''

            for (let i = 0; i < data.length; i++) {
                option += `<option value="${data[i]}">${data[i]}</option>`
            }
            $('#category-type').html(
                `<select name="categoryType" id="category-type">
                        ${option}
                    </select>`
            )
        },
        error: (err) => {
            $('#category-type-error').html(`<p style="color:red">${err.responseJSON}</p>`)
            $('#category-type-error').removeAttr('hidden')
            setTimeout(() => {
                $('#category-type-error').attr('hidden', 'true')
            }, 2000)
        }
    })
})

async function createCategory($event) {
    $event.preventDefault()
    const category = $('#category').val()
    const subCategory = $('#sub-category').val()
    const categoryType = $('#categoryType').val()
    let typeBool = true;

    if (categoryType.length == 0) {
        $('#typeError').removeAttr('hidden')
        setTimeout(() => {
            $('#typeError').attr('hidden', 'true')
        }, 2000);
        typeBool = false
    }

    if (!category && !subCategory && bool) {
        $('#submitError').removeAttr('hidden')
        setTimeout(() => {
            $('#submitError').attr('hidden', 'true')
        }, 2000);
    } else {
        const data = {
            mainCategory: category,
            subCategory: subCategory,
            addCategory: categoryType
        }

        await $.ajax({
            url: 'http://localhost:3000/v1/admin/category/all',
            data: data,
            type: 'POST',
            success:(res)=>{
                console.log(res);
            },
            error:()=>{

            }

        })
    }
}


function deleteProduct($event, id) {
    $event.preventDefault()
    $.ajax({
        url: `http://localhost:3000/v1/admin/products/${id}`,
        type: "DELETE",
        success: function (data) {
            window.location.reload()
        },
        error: () => {
            console.log('error');
        }
    })
}

function access($event, access, id) {
    $event.preventDefault()
    $.ajax({
        url: `http://localhost:3000/v1/admin/users/access?id=${id}&access=${access}`,
        type: 'PATCH',
        success: (data, status, xhr) => {
            window.location.reload()
        },
        error: () => {
            console.log('error');
        }
    })
}

function validateProduct($event) {


    $('#name-error').attr('hidden', true)
    $('#image-error1').attr('hidden', true)
    $('#image-error2').attr('hidden', true)
    $('#description-error').attr('hidden', true)
    $('#price-error').attr('hidden', true)
    $('#brand-error').attr('hidden', true)
    $('#size-error').attr('hidden', true)
    $('#quantity-error').attr('hidden', true)
    $('#color-error').attr('hidden', true)

    let productRegex = /^[A-Z][a-zA-Z0-9\s]{1,100}$/
    let imgRegex = /(\.jpg|\.jpeg|\.png)$/

    let productNameTest = null;
    let imageTest = null
    let descriptionTest = null
    let priceTest = null
    let brandTest = null
    let quantiyTest = null
    let sizeTest = null
    let colorTest = null
    let images = []

    let product_name = $('#product_name').val().trim()
    let brand = $('#brand').val().trim()
    let gender = $('#gender').val().trim()
    let quantity = $('#quantity').val().trim()
    let size = $('#size').val().trim()
    let color = $('#color').val().trim()
    let category = $('#category').val().trim()
    let active = $('#active').val().trim()
    let subcategory = $('#subcategory').val().trim()
    let description = $('#description').val().trim()
    let price = $('#price').val().trim()
    let image1 = $('#image1').val()
    let image2 = $('#image2').val()
    let image3 = $('#image3').val()


    // Image test
    if (image1 != 0 && image2 != 0 && image3 != 0) {

        image1 = image1.split('\\')
        image2 = image2.split('\\')
        image3 = image3.split('\\')

        images.push(image1[image1.length - 1], image2[image2.length - 1], image3[image3.length - 1])
        let imgBool = images.every(img => {
            return imgRegex.test(img)
        });
        if (imgBool) {
            imageTest = true
        } else {
            $('#image-error2').removeAttr('hidden')
            imageTest = false
        }
    } else {
        $('#image-error1').removeAttr('hidden')
        imageTest = false
    }

    // product name test
    if (!productRegex.test(product_name)) {
        $('#name-error').removeAttr('hidden')
        productNameTest = false
    } else {
        productNameTest = true
    }
    // description test
    if (description.length < 16) {
        descriptionTest = false
        $('#description-error').removeAttr('hidden')
    } else {
        descriptionTest = true
    }

    // price test
    let priceType = Number(price)
    if (price.length == 0 || isNaN(priceType)) {
        priceTest = false
        $('#price-error').removeAttr('hidden')
    } {
        priceTest = true
    }

    // brand test
    if (brand.length == 0) {
        brandTest = false
        $('#brand-error').removeAttr('hidden')

    } else {
        brandTest = true
    }

    // quantity test
    if (quantity.length == 0) {
        quantiyTest = false
        $('#quantity-error').removeAttr('hidden')
    } else {
        quantiyTest = true
    }

    // size test
    if (size.length == 0) {
        sizeTest = false
        $('#size-error').removeAttr('hidden')
    } else {
        sizeTest = true
    }

    // color test
    if (color.length == 0) {
        colorTest = false
        $('#color-error').removeAttr('hidden')
    } else {
        colorTest = true
    }

    // submit
    if (
        productNameTest == true &&
        imageTest == true &&
        descriptionTest == true &&
        priceTest == true &&
        brandTest == true &&
        quantiyTest == true &&
        sizeTest == true &&
        colorTest == true
    ) {
        return true
    } else {
        return false
    }
}
