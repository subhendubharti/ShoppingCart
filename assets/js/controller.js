

var app = angular.module("ShoppingCart",['services.cart']);

app.controller('StockController', ['Cart', '$rootScope', '$scope', function (Cart, $rootScope, $scope) {
    var Stock = $scope;
    Stock.NoOfItems = Cart.getCart().length || 0;
    Stock.NoOfSelectedItems = 0;
    Stock.SelectedItems = [];
    Stock.StockItems = [
    {
        "ItemId": "Basket Ball",
        "Name": "Basket Ball",
        "QuantityAvailable": 10,
        "image": "assets/images/items/ball1.png",
        "description": "A basket ball made of superior quality materials.",
        "InCart": false

    },
    {
        "ItemId": "Boxing Gloves",
        "QuantityAvailable": 10,
        "Name": "Boxing Gloves",
        "image": "assets/images/items/boxing-gloves.png",
        "description": "A boxing gloves made of superior quality materials.",
        "InCart": false
    },
    {
        "ItemId": "Cricket Gloves",
        "QuantityAvailable": 10,
        "Name": "Cricket Gloves",
        "image": "assets/images/items/cricket-gloves.png",
        "description": "A cricket gloves made of superior quality materials.",
        "InCart": false
    },
    {
        "ItemId": "Cricket Ball",
        "QuantityAvailable": 10,
        "Name": "Cricket Ball",
        "image": "assets/images/items/ball3.png",
        "description": "A cricket ball made of superior quality materials.",
        "InCart": false
    },
    {
        "ItemId": "Rugby Ball",
        "QuantityAvailable": 10,
        "Name": "Rugby Ball",
        "image": "assets/images/items/rugby-ball.png",
        "description": "A rugby ball made of superior quality materials.",
        "InCart": false
    }
    ];

    Stock.showCart = false;
    Stock.showSelectedItems = false;

    Stock.addToSelectedItems = function (id) {
        var s = $scope.SelectedItems;
        var elem = id;
        var qty = document.getElementById("qty" + elem).value;
        for (var i = 0; i < s.length; i++) {
            if (s[i].ItemId === id) {
                s[i].Quantity = parseInt(s[i].Quantity) + parseInt(qty);
                break;
            }
        }
        if (i == s.length) {
            $scope.SelectedItems.push(new CartItem(elem, qty));
        }

        $scope.NoOfSelectedItems = $scope.SelectedItems.length;
    }

    Stock.addItem = function (id) {
        var elem = id;
        var qty = document.getElementById("qty" + elem).value;
        //alert(elem + " " + qty);
        var cartItem = new CartItem(elem, qty);
        // alert("Added item is " + cartItem.ItemId + " Quantity is" + cartItem.Quantity);
        Cart.addItem(cartItem);
        var cart = Cart.getCart();
        Stock.NoOfItems = cart.length;
    };
    Stock.addSelectedItemsToCart = function () {
        // alert(Stock.SelectedItems.length);
        Cart.addItems(Stock.SelectedItems);
        Stock.NoOfItems = Cart.getCart().length;
        Stock.SelectedItems = [];
        Stock.NoOfSelectedItems = 0;
        Stock.showSelectedItems = false;
    };
    Stock.removeSelectedItem = function (itemid) {
        if (Stock.SelectedItems.length == 1) {
            Stock.NoOfSelectedItems = 0;
            Stock.SelectedItems = [];
        } else {
            for (var i = 0; i < Stock.SelectedItems.length; i++) {
                if (Stock.SelectedItems[i].ItemId === itemid) {
                    Stock.SelectedItems.splice(i, 1);
                    Stock.NoOfSelectedItems -= 1;
                }
            }
        }
    };

    Stock.$on('CartModified', function (event, args) {
        $scope.NoOfItems = Cart.getCart().length;
    });
} ])
app.controller('CartController', ['Cart', '$rootScope', '$scope', function (Cart, $rootScope, $scope) {
    $scope.NoOfItems = Cart.getCart().length||0;
    $scope.Items = Cart.getCart();
    $scope.remove = function (itemid) {
        Cart.remove(itemid);
    };
    $scope.qtyChanged = function () {
        alert("changed");
    };
    $scope.quantityChanged = function (id, qty) {
        //alert(id + " was changed to " + qty);
        Cart.changeQuantity(id, qty);

    };
    $scope.clearCart = function () {
        Cart.clear();
        $scope.Items = [];
    }

    $scope.$on('CartModified', function (event, args) {
        //alert("CartModified");
        $scope.NoOfItems = Cart.getCart().length;
        $scope.Items = Cart.getCart();
    });
} ]);


