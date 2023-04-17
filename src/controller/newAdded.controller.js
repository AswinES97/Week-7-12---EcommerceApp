const { newAdded } = require("../models/newAdded.model")

module.exports = {
    httpNewAdded:async (req, res) => {
        let renderData = ''
        const dataUser = JSON.parse(req.query.dataUser)
        const data = await newAdded()
            .catch(err=>err)
        if(data){
            if(dataUser){
                data.forEach(ele=>{
                    renderData += `
                    <div class="col-lg-4 col-md-4 col-12 col-sm-6">
                                        <div class="product-cart-wrap mb-30">
                                            <div class="product-img-action-wrap">
                                                <div class="product-img product-img-zoom">
                                                    <a href="/v1/product?name=${ele.slug}&&pId=${ele.pId}">
                                                        <img class="default-img" src="${ele.image[0]}" alt="">
                                                        <img class="hover-img" src="${ele.image[1]}"  alt="">
                                                    </a>
                                                </div>
                                                <div class="product-action-1">
                                                    <a aria-label="Add To Wishlist" class="action-btn hover-up" href="#"><i class="fi-rs-heart"></i></a>
                                                </div>
                                                <div class="product-badges product-badges-position product-badges-mrg">
                                                    <span class="hot">Hot</span>
                                                </div>
                                            </div>
                                            <div class="product-content-wrap">
                                                <div class="product-category">
                                                    <a href="/v1/product?name=${ele.slug}&&pId=${ele.pId}">${ele.brand}</a>
                                                </div>
                                                <h2><a href="/v1/product?name=${ele.slug}&&pId=${ele.pId}">${ele.name.substring(0.30)}...</a></h2>
                                                <div class="rating-result" title="90%">
                                                    <span>
                                                        <span>90%</span>
                                                    </span>
                                                </div>
                                                <div class="product-price">
                                                    <span>₹${ele.price}</span>
                                                    <!-- <span class="old-price">$245.8</span> -->
                                                </div>
                                                
                                                <div class="product-action-1 show">
                                                    <a id="addLanding" onclick="addFromLanding('${ele.pId}')" data-user=${dataUser} aria-label="Add To Cart" class="action-btn hover-up" ><i class="fi-rs-shopping-bag-add"></i></a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                    
                    `
                })

            }else{
                data.forEach(ele=>{
                    renderData += `
                    <div class="col-lg-4 col-md-4 col-12 col-sm-6">
                                        <div class="product-cart-wrap mb-30">
                                            <div class="product-img-action-wrap">
                                                <div class="product-img product-img-zoom">
                                                    <a href="/v1/product?name=${ele.slug}&&pId=${ele.pId}">
                                                        <img class="default-img" src="${ele.image[0]}" alt="">
                                                        <img class="hover-img" src="${ele.image[1]}"  alt="">
                                                    </a>
                                                </div>
                                                <div class="product-action-1">
                                                    <a aria-label="Add To Wishlist" class="action-btn hover-up" href="#"><i class="fi-rs-heart"></i></a>
                                                </div>
                                                <div class="product-badges product-badges-position product-badges-mrg">
                                                    <span class="hot">Hot</span>
                                                </div>
                                            </div>
                                            <div class="product-content-wrap">
                                                <div class="product-category">
                                                    <a href="/v1/product?name=${ele.slug}&&pId=${ele.pId}">${ele.brand}</a>
                                                </div>
                                                <h2><a href="/v1/product?name=${ele.slug}&&pId=${ele.pId}">${ele.name.substring(0.30)}...</a></h2>
                                                <div class="rating-result" title="90%">
                                                    <span>
                                                        <span>90%</span>
                                                    </span>
                                                </div>
                                                <div class="product-price">
                                                    <span>₹${ele.price}</span>
                                                    <!-- <span class="old-price">$245.8</span> -->
                                                </div>
                                                <div class="product-action-1 show">
                                                    <a id="addLanding" data-bs-toggle="modal" data-bs-target="#staticBackdrop" data-user=false onclick="cartHome()" aria-label="Add To Cart" class="action-btn hover-up" href="#"><i class="fi-rs-shopping-bag-add"></i></a>
                                                </div>
                                                </div>
                                        </div>
                                    </div>
                                                `
                })

            }
            return res.json({ok:true,data:renderData})
        }
        return res.status(400).json({ok:false})
    }
}