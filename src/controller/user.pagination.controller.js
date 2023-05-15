const { productWithCategory } = require("../models/products.model")
const { formatCurrency } = require("../services/currencyFormatter")

const createProductCard = (products, userStatus) => {
    let data = ''
    products.forEach(ele => {
        data += `
        <div class="product-cart-wrap">
        <div class="product-img-action-wrap">
            <div class="product-img product-img-zoom">
                <div class="product-img-inner">
                    <a href="/v1/product?name=${ele.slug}&pId=${ele.pId}">
                        <img class="default-img" src="${ele.image[0]}" alt="">
                        <img class="hover-img" src="${ele.image[1]}" alt="">
                    </a>
                </div>
            </div>
            <div class="product-action-1">`
        if (userStatus) {
            data += `<a aria-label="Add To Wishlist" class="action-btn hover-up" href="#" onclick="wishlitBtn(event,'${ele.slug}')"><i class="fi-rs-heart"></i></a>`
        } else {
            data += `<a aria-label="Add To Wishlist" class="action-btn hover-up" href="#" data-bs-toggle="modal" data-bs-target="#staticBackdrop" data-user=false onclick="cartHome()" ><i class="fi-rs-heart"></i></a>`
        }
        data += `</div>
            <div class="product-badges product-badges-position product-badges-mrg">
                <span class="hot">Hot</span>
            </div>
        </div>
        <div class="product-content-wrap">
            <div class="product-category">
                <a href="#">${ele.brand}</a>
            </div>
            <h2><a href="/v1/product?name=${ele.slug}&pId=${ele.pId}">${ele.name}</a></h2>`
        if (!ele.offerprice) {
            data += `<div class="product-price">
                <span>${formatCurrency(ele.price)}</span>
            </div>`
        } else {
            data += `<div class="product-price">
                    <span>${formatCurrency(ele.offerprice)}</span>
                    <span class="old-price">${formatCurrency(ele.price)}</span>
                    <span>${ele.offerpercentage}% off</span>
                </div>`
        }
        data += `<p class="mt-15">${ele.description.substring(0, 70)}...</p>
            <div class="product-action-1 show">`
        if (userStatus) {
            data += `<div class="product-action-1 show">
                <a id="addLanding" onclick="addFromLanding('${ele.pId}')" data-user=${userStatus} aria-label="Add To Cart" class="action-btn hover-up" ><i class="fi-rs-shopping-bag-add"></i>Add to Cart</a>
            </div>`
        } else {
            data += `<div class="product-action-1 show">
                <a id="addLanding" data-bs-toggle="modal" data-bs-target="#staticBackdrop" data-user=false onclick="cartHome()" aria-label="Add To Cart" class="action-btn hover-up" href="#"><i class="fi-rs-shopping-bag-add"></i></a>
            </div>`
        }
        data += `</div>
        </div>
    </div>
        `
    })
    return data
}

const httpPaginationController = async (req, res) => {
    const user = req.user
    const query = req.query
    const products = await productWithCategory(query.category, query.skip)
    const data = createProductCard(products, user.loggedIn)
    if (products) {
        return res.json({ ok: true, data: data })
    }
    return res.status(400).json({ ok: false, data: "Unable to fetch data right Now!" })
}

module.exports = {
    httpPaginationController: httpPaginationController,
    createProductCard: createProductCard
}