!(function (e) {
  "use strict";
  if (
    (e(".menu-item.has-submenu .menu-link").on("click", function (s) {
      s.preventDefault(),
        e(this).next(".submenu").is(":hidden") &&
          e(this)
            .parent(".has-submenu")
            .siblings()
            .find(".submenu")
            .slideUp(200),
        e(this).next(".submenu").slideToggle(200);
    }),
    e("[data-trigger]").on("click", function (s) {
      s.preventDefault(), s.stopPropagation();
      var n = e(this).attr("data-trigger");
      e(n).toggleClass("show"),
        e("body").toggleClass("offcanvas-active"),
        e(".screen-overlay").toggleClass("show");
    }),
    e(".screen-overlay, .btn-close").click(function (s) {
      e(".screen-overlay").removeClass("show"),
        e(".mobile-offcanvas, .show").removeClass("show"),
        e("body").removeClass("offcanvas-active");
    }),
    e(".btn-aside-minimize").on("click", function () {
      window.innerWidth < 768
        ? (e("body").removeClass("aside-mini"),
          e(".screen-overlay").removeClass("show"),
          e(".navbar-aside").removeClass("show"),
          e("body").removeClass("offcanvas-active"))
        : e("body").toggleClass("aside-mini");
    }),
    e(".select-nice").length && e(".select-nice").select2(),
    e("#offcanvas_aside").length)
  ) {
    const e = document.querySelector("#offcanvas_aside");
    new PerfectScrollbar(e);
  }
  e(".darkmode").on("click", function () {
    e("body").toggleClass("dark");
  });
})(jQuery);

// category loading
async function categoryInitialDisplay() {
  return await $.ajax({
    url: "/v1/admin/category/all",
    type: "GET",
    success: async (data) => {
      return data;
    },
    error: (err) => {},
  });
}

function option(data, editDefault = undefined) {
  const { category, subCategory, categoryType } = data;
  let categoryValue, subCategoryValue, categoryTypeValue, selectedTypeValue;

  if (editDefault) {
    categoryValue = editDefault.categoryValue;
    subCategoryValue = editDefault.subCategoryValue;
    categoryTypeValue = editDefault.categoryTypeValue;
    selectedTypeValue = editDefault.selectedTypeValue;
  }

  let optionCategory = "";
  let optionSubCategory = "";
  let optionCategoryType = "";

  if (category) {
    category.forEach((ele) => {
      if (ele == categoryValue) {
        optionCategory += `<option selected value="${ele}">${ele}</option>`;
      } else {
        optionCategory += `<option value="${ele}">${ele}</option>`;
      }
    });
    $("#category").html(
      `<select name="category" id="category">
                            ${optionCategory}
                        </select>`
    );
  }

  if (subCategory) {
    subCategory.forEach((ele) => {
      if (ele == subCategoryValue) {
        optionSubCategory += `<option selected value="${ele}">${ele}</option>`;
      } else {
        optionSubCategory += `<option value="${ele}">${ele}</option>`;
      }
    });

    $("#sub-category").html(
      `<select name="subCategory" id="sub-category">
                            ${optionSubCategory}
                        </select>`
    );
  }

  if (categoryTypeValue) {
    categoryTypeValue.forEach((ele) => {
      if (ele == selectedTypeValue) {
        optionCategoryType += `<option selected value="${ele}">${ele}</option>`;
      } else {
        optionCategoryType += `<option value="${ele}">${ele}</option>`;
      }
    });

    $("#category-type").html(
      `<select name="categoryType" id="category-type">
                                    ${optionCategoryType}
                                </select>`
    );
  } else {
    categoryType.forEach((ele) => {
      optionCategoryType += `<option value="${ele}">${ele}</option>`;
    });

    $("#category-type").html(
      `<select name="categoryType" id="category-type">
                            ${optionCategoryType}
                        </select>`
    );
  }
}

$(document).ready(async function () {
  let productId = document.location.pathname.split("/");
  productId = productId[productId.length - 1];

  if (
    document.location.href == "/v1/admin/products/add-product" ||
    document.location.href == `/v1/admin/offer`
  ) {
    const data = await categoryInitialDisplay();
    option(data);
  }

  if (document.location.href == `/v1/admin/products/${productId}`) {
    const categoryValue = $("#category").val();
    const subCategoryValue = $("#sub-category").val();
    const categoryTypeValue = $("#category-type").val();

    $.ajax({
      url: "/v1/admin/category/all",
      type: "GET",
      data: {
        categoryValue,
        subCategoryValue,
      },
      success: async (data) => {
        const initial = await categoryInitialDisplay();
        data = {
          categoryValue,
          subCategoryValue,
          categoryTypeValue: data,
          selectedTypeValue: categoryTypeValue,
        };
        option(initial, data);
      },
      error: () => {},
    });
  }

  if (document.location.href == "/v1/admin/category") {
    const data = await categoryInitialDisplay();
    option(data);
  }
});

$("#category").change(async () => {
  const category = $("#category").val();

  $.ajax({
    url: "/v1/admin/category/all",
    type: "GET",
    data: {
      category,
    },
    success: (data) => {
      option(data);
    },
    error: () => {},
  });
});

$("#sub-category").change(async () => {
  const categoryValue = $("#category").val();
  const subCategoryValue = $("#sub-category").val();

  await $.ajax({
    url: "/v1/admin/category/all",
    type: "GET",
    data: {
      categoryValue,
      subCategoryValue,
    },
    success: (data) => {
      let option = "";

      for (let i = 0; i < data.length; i++) {
        option += `<option value="${data[i]}">${data[i]}</option>`;
      }
      $("#category-type").html(
        `<select name="categoryType" id="category-type">
                        ${option}
                    </select>`
      );
    },
    error: (err) => {
      $("#category-type-error").html(
        `<p style="color:red">${err.responseJSON}</p>`
      );
      $("#category-type-error").removeAttr("hidden");
      setTimeout(() => {
        $("#category-type-error").attr("hidden", "true");
      }, 2000);
    },
  });
});

async function createCategory($event) {
  $event.preventDefault();
  const category = $("#category").val();
  const subCategory = $("#sub-category").val();
  const categoryType = $("#categoryType").val();
  let typeBool = true;

  if (categoryType.length == 0) {
    $("#typeError").removeAttr("hidden");
    setTimeout(() => {
      $("#typeError").attr("hidden", "true");
    }, 2000);
    typeBool = false;
  }

  if (!category && !subCategory && bool) {
    $("#submitError").removeAttr("hidden");
    setTimeout(() => {
      $("#submitError").attr("hidden", "true");
    }, 2000);
  } else {
    const data = {
      mainCategory: category,
      subCategory: subCategory,
      addCategory: categoryType,
    };

    await $.ajax({
      url: "/v1/admin/category/all",
      data: data,
      type: "POST",
      success: (res) => {
        swal("Done!", res.ok, "success").then(() => {
          window.location.reload();
        });
      },
      error: () => {
        swal(res.err);
      },
    });
  }
}
// delete category

async function deleteCategory(e, i) {
  e.preventDefault();
  let bool = false;
  await swal("Delete", "Delete this Category?", "warning", {
    buttons: {
      cancel: "Cancel",
      catch: {
        text: "Remove",
        value: true,
      },
    },
  }).then((result) => {
    bool = result;
  });
  console.log(bool);
  if (bool) {
    const rowValues = [];
    $(`#${i} td`).each(function () {
      rowValues.push($(this).text());
    });
    const headers = {
      "Content-Type": "application/json",
    };
    const body = {
      gender: rowValues[0],
      category: rowValues[1],
      categoryType: rowValues[2],
    };
    await commonAjax("/v1/admin/category/all", "DELETE", headers, body)
      .then((res) => {
        swal(res.data);
        setTimeout(() => {
          window.location.reload();
        }, 500);
      })
      .catch((err) => {
        swal(err.data);
        setTimeout(() => {
          window.location.reload();
        }, 500);
      });
  }
}

// edit category

function editCategory(e, i) {
  e.preventDefault();
  const rowValues = [];
  $(`#${i} td`).each(function () {
    rowValues.push($(this).text());
  });
  const data = {
    gender: rowValues[0],
    category: rowValues[1],
    categoryType: rowValues[2],
  };
  $("#modal-gender").text(data.gender);
  $("#modal-category").text(data.category);
  $("#modal-categoryTypeValue").text(data.categoryType);
  $("#modal-categoryType").val(data.categoryType);
  $("#staticBackdrop").modal("show");
}

$("#modal-save").on("click", async () => {
  $("#modal-save").prop("disabled", true);
  const body = {
    gender: $("#modal-gender").text().trim(),
    category: $("#modal-category").text().trim(),
    previousCategoryType: $("#modal-categoryTypeValue").text(),
    categoryType: $("#modal-categoryType").val().trim(),
  };
  const headers = {
    "Content-Type": "application/json",
  };

  if (!body.categoryType) $("#modal-error").attr("hidden", false);
  else {
    await commonAjax("/v1/admin/category/all", "PUT", headers, body)
      .then((res) => {
        swal(res.data);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      })
      .catch((err) => {
        swal(err.data);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      });
  }
});

// product
function deleteProduct($event, pId) {
  $event.preventDefault();

  swal("Delete", "Delete this product?", "warning", {
    buttons: {
      cancel: "Cancel",
      catch: {
        text: "Remove",
        value: true,
      },
    },
  }).then((result) => {
    if (result) {
      $.ajax({
        url: `/v1/admin/products/${pId}`,
        type: "DELETE",
        success: function (data) {
          window.location.reload();
        },
        error: () => {
          console.log("error");
        },
      });
    }
  });
}

function access($event, access, userId) {
  $event.preventDefault();
  $.ajax({
    url: `/v1/admin/users/access?userId=${userId}&access=${access}`,
    type: "PATCH",
    success: (data, status, xhr) => {
      window.location.reload();
    },
    error: () => {
      console.log("error");
    },
  });
}

function validateProduct($event) {
  $("#name-error").attr("hidden", true);
  $("#image-error1").attr("hidden", true);
  $("#image-error2").attr("hidden", true);
  $("#description-error").attr("hidden", true);
  $("#price-error").attr("hidden", true);
  $("#brand-error").attr("hidden", true);
  $("#size-error").attr("hidden", true);
  $("#quantity-error").attr("hidden", true);
  $("#color-error").attr("hidden", true);

  let productRegex = /^[A-Z][a-zA-Z0-9\s]{1,100}$/;
  let imgRegex = /(\.jpg|\.jpeg|\.png|\.svg|\.webp)$/;

  let productNameTest = null;
  let imageTest = null;
  let descriptionTest = null;
  let priceTest = null;
  let brandTest = null;
  let quantiyTest = null;
  let sizeTest = null;
  let colorTest = null;
  let images = [];

  let product_name = $("#product_name").val().trim();
  let brand = $("#brand").val().trim();
  let quantity = $("#quantity").val().trim();
  let size = $("#size").val().trim();
  let color = $("#color").val().trim();
  let description = $("#description").val().trim();
  let price = $("#price").val().trim();
  let image1 = $("#image1").val();
  let image2 = $("#image2").val();
  let image3 = $("#image3").val();

  // Image test
  if (image1 != 0 && image2 != 0 && image3 != 0) {
    image1 = image1.split("\\");
    image2 = image2.split("\\");
    image3 = image3.split("\\");

    images.push(
      image1[image1.length - 1],
      image2[image2.length - 1],
      image3[image3.length - 1]
    );
    let imgBool = images.every((img) => {
      return imgRegex.test(img);
    });
    if (imgBool) {
      imageTest = true;
    } else {
      $("#image-error2").removeAttr("hidden");
      imageTest = false;
    }
  } else {
    $("#image-error1").removeAttr("hidden");
    imageTest = false;
  }

  // product name test
  if (!productRegex.test(product_name)) {
    $("#name-error").removeAttr("hidden");
    productNameTest = false;
  } else {
    productNameTest = true;
  }
  // description test
  if (description.length < 16) {
    descriptionTest = false;
    $("#description-error").removeAttr("hidden");
  } else {
    descriptionTest = true;
  }

  // price test
  let priceType = Number(price);
  if (price.length == 0 || isNaN(priceType)) {
    priceTest = false;
    $("#price-error").removeAttr("hidden");
  }
  {
    priceTest = true;
  }

  // brand test
  if (brand.length == 0) {
    brandTest = false;
    $("#brand-error").removeAttr("hidden");
  } else {
    brandTest = true;
  }

  // quantity test
  if (quantity.length == 0) {
    quantiyTest = false;
    $("#quantity-error").removeAttr("hidden");
  } else {
    quantiyTest = true;
  }

  // size test
  if (size.length == 0) {
    sizeTest = false;
    $("#size-error").removeAttr("hidden");
  } else {
    sizeTest = true;
  }

  // color test
  if (color.length == 0) {
    colorTest = false;
    $("#color-error").removeAttr("hidden");
  } else {
    colorTest = true;
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
    return true;
  } else {
    return false;
  }
}

// pagination orders
async function pagination(event, skip) {
  if (event) event.preventDefault();
  let data;
  let tr = "";
  let paginationApiEnd = location.href.split("/");
  paginationApiEnd = paginationApiEnd[paginationApiEnd.length - 1];

  skip = Number(skip);
  data = await fetch(
    `/v1/admin/pagination?skip=${skip}&type=${paginationApiEnd}`
  ).then((res) => res.json());
  if (!data.ok) swal(data.data);

  if (paginationApiEnd === "orders") $("#order-table").html(data.data);
  if (paginationApiEnd === "products") $("#product-card-admin").html(data.data);
}

// order-status submit change/update
async function changeOrderStatus() {
  const orderId = $("#orderId-order-details").text();
  const orderStatus = $("#order-status").val();
  const headers = {
    "Content-Type": "application/json",
  };

  if (orderStatus.length === 0) return swal("Not Updated Order Status");
  await commonAjax("/v1/admin/orders/single", "POST", headers, {
    orderStatus: orderStatus,
    orderId: orderId,
  })
    .catch((res) => res)
    .then((res) => {
      return swal(res.data);
    })
    .catch((err) => {
      return swal(err.data);
    });
}

$("#orderStatus").click(changeOrderStatus);

// getAllCategoryOffer
async function getAllCategoryOffer() {
  await commonAjax("/v1/admin/offer/category")
    .then((res) => {
      $("#category-offer-display").html(res.data);
    })
    .catch((err) => {
      swal(err.data);
    });
}

// offer change tabs
$("#change-offer").on("change", async () => {
  const offerDropVal = $("#change-offer").val();
  $("#category-offer").hide();
  $("#product-offer").hide();

  if (offerDropVal === "category") {
    await getAllCategoryOffer();
    $("#category-offer").show();
  }
  if (offerDropVal === "product") $("#product-offer").show();
});

// category offer
$("#category-offer-form").submit((event) => {
  event.preventDefault();
  const formData = $("#category-offer-form").serializeArray();
  let body = {};
  formData.forEach((ele) => {
    body[ele.name] = ele.value;
  });
  const headers = {
    "Content-Type": "application/json",
  };
  commonAjax("/v1/admin/offer/category", "POST", headers, body)
    .then((res) => {
      swal(res.data);
      setTimeout(() => {
        location.reload();
      }, 750);
    })
    .catch((err) => {
      swal(err.data);
      setTimeout(() => {
        location.reload();
      }, 750);
    });
});

function deactivateOffer(categoryType) {}

function activateOffer(categoryType) {}

async function deleteOffer(categoryType) {
  const headers = {
    "Content-Type": "application/json",
  };
  const body = {
    categoryType: categoryType,
  };

  await commonAjax("/v1/admin/offer/category", "DELETE", headers, body)
    .then((res) => {
      swal(res.data);
      setTimeout(() => {
        location.reload();
      }, 750);
    })
    .catch((err) => {
      swal(err.data);
      setTimeout(() => {
        location.reload();
      }, 750);
    });
}

// Search
$("#search").on("keydown", async (event) => {
  $("#search-err").attr("hidden", true);
  const code = event.which || event.keyCode || event.charCode;

  if (code === 8) {
    pagination(null, 0);
    $("#pagination").attr("hidden", false);
  }

  if (code === 13) {
    const val = $("#search").val().trim();
    let searchApiEnd = location.href.split("/");
    searchApiEnd = searchApiEnd[searchApiEnd.length - 1];

    if (val.length != 0) {
      const headers = {
        "Content-Type": "application/json",
      };
      await commonAjax(
        `/v1/admin/search?type=${searchApiEnd}&value=${val}`,
        "GET",
        headers
      )
        .then((res) => {
          if (searchApiEnd === "orders") {
            $("#pagination").attr("hidden", true);
            $("#order-table").html(res.data);
          }
          if (searchApiEnd === "products") {
            $("#pagination").attr("hidden", true);
            $("#product-card-admin").html(res.data);
          }
          if (searchApiEnd === "coupon") {
            $("#coupon-table").html(res.data);
          }
        })
        .catch((err) => {
          if (!err.ok) $("#search-err").attr("hidden", false);
          else swal(err.data);
        });
    } else {
      $("#search-err").attr("hidden", false);
    }
  }
});

// coupon

async function createCoupon(e) {
  e.preventDefault();
  $("#coupon-submit").attr("disabled", "");
  const discount = $("#discount").val();
  const description = $("#description").val();
  const minPurchase = $("#minPurchase").val();
  const expiryDate = $("#expiryDate").val();
  const active = $("#active").val();
  const body = {
    discount,
    description,
    minPurchase,
    expiryDate,
    active,
  };
  const headers = {
    "Content-Type": "application/json",
  };

  await commonAjax("/v1/admin/coupon", "POST", headers, body)
    .then((res) => {
      swal(res.data);
      setTimeout(() => {
        location.reload();
      }, 500);
    })
    .catch((err) => {
      $("#coupon-submit").removeAttr("disabled");
      swal(err.data);
    });
}

async function editCoupon(e, code, type = null) {
  e.preventDefault();
  const headers = {
    "Content-Type": "application/json",
  };
  if (!type) {
    await commonAjax("/v1/admin/coupon/edit", "PUT", headers, {
      code,
      toggle: null,
    })
      .then((res) => {
        swal(res.data);
        setTimeout(() => {
          location.reload();
        }, 500);
      })
      .catch((err) => {
        swal(err.data);
      });
  } else if (type === "deactivate") {
    await commonAjax("/v1/admin/coupon/edit", "PUT", headers, {
      code,
      toggle: type,
    })
      .then((res) => {
        swal(res.data);
        setTimeout(() => {
          location.reload();
        }, 500);
      })
      .catch((err) => {
        swal(err.data);
      });
  } else if (type === "delete") {
    swal("Delete", "Delete this Coupon?", "warning", {
      buttons: {
        cancel: "Cancel",
        catch: {
          text: "Remove",
          value: true,
        },
      },
    }).then(async (result) => {
      if (result) {
        await commonAjax("/v1/admin/coupon/edit", "DELETE", headers, { code })
          .then((res) => {
            swal(res.data);
            setTimeout(() => {
              location.reload();
            }, 500);
          })
          .catch((err) => {
            swal(err.data);
          });
      }
    });
  }
}

// banner

async function editBanner(e, text1, type = null) {
  e.preventDefault();
  const headers = {
    "Content-Type": "application/json",
  };
  if (!type) {
    await commonAjax("/v1/admin/banner", "PUT", headers, {
      text1,
      toggle: null,
    })
      .then((res) => {
        swal(res.data);
        setTimeout(() => {
          location.reload();
        }, 500);
      })
      .catch((err) => {
        swal(err.data);
      });
  } else if (type === "deactivate") {
    await commonAjax("/v1/admin/banner", "PUT", headers, {
      text1,
      toggle: type,
    })
      .then((res) => {
        swal(res.data);
        setTimeout(() => {
          location.reload();
        }, 500);
      })
      .catch((err) => {
        swal(err.data);
      });
  } else if (type === "delete") {
    swal("Delete", "Delete this Banner?", "warning", {
      buttons: {
        cancel: "Cancel",
        catch: {
          text: "Remove",
          value: true,
        },
      },
    }).then(async (result) => {
      if (result) {
        await commonAjax("/v1/admin/banner", "DELETE", headers, { text1 })
          .then((res) => {
            swal(res.data);
            setTimeout(() => {
              location.reload();
            }, 500);
          })
          .catch((err) => {
            swal(err.data);
          });
      }
    });
  }
}
