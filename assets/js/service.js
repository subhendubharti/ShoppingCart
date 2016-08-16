var cs=angular.module('services.cart', []);
cs.service('Reviewer', ['$rootScope','$q', function ($rootScope,$q) {
    var review = function (cart) {
        var c = cart;
        var deferred=$q.defer();
            try {
                if (c.length>0) {
                    deferred.resolve("Can be added");
                    }else{
                        deferred.reject("Nothing to add")
                    }
            } catch (exception) {
                deferred.reject("Some Error Occured");
            }
         return deferred.promise;
    }
    this.review = review;
} ]);
cs.service('Cart', ['$rootScope', 'Reviewer', function ($rootScope, Reviewer) {
    var cart = JSON.parse(localStorage.getItem('cart')) || [];
    var getCart = function () {
        //alert(cart);
        return cart;
    };

    var addItem = function (item) {
        for (var i = 0; i < cart.length; i++) {
            if (cart[i].ItemId === item.ItemId) {
                cart[i].Quantity = parseInt(cart[i].Quantity) + parseInt(item.Quantity);
                break;
            }
        }
        if (i == cart.length) {
            cart.push(item);
        }

        save();
        refresh();
    };

    var addItems = function (items) {
        for (var i = 0; i < items.length; i++) {
            for (var j = 0; j < cart.length; j++) {
                if (items[i].ItemId === cart[j].ItemId) {
                    cart[j].Quantity = parseInt(cart[j].Quantity) + parseInt(items[i].Quantity);
                    break;
                }
            }
            if (j === cart.length) {
                cart.push(items[i]);
            }
        }
        save();
        refresh();
    };

    var save = function () {
        Reviewer.review(cart).then(function (data) {
           //alert("can be saved"+data);
            persist();
        }, function (error) {
            alert(error);
        });

    };

    var remove = function (itemid) {
        if (cart.length == 1) {
            localStorage.removeItem('cart');
            cart = [];
        } else {
            for (var i = 0; i < cart.length; i++) {
                if (cart[i].ItemId == itemid) {
                    cart.splice(i, 1);
                }
            }
            save();
        }
        refresh();
    };

    var clear = function () {
        cart = [];
        localStorage.removeItem('cart');
        refresh();

    };

    var persist = function () {
        localStorage.removeItem('cart');
        temp = JSON.stringify(cart);
        // alert(cart.length);
        localStorage.setItem('cart', temp);
        refresh();
    };

    var changeQuantity = function (itemid, quantity) {
        for (var i = 0; i < cart.length; i++) {
            if (cart[i].ItemId === itemid) {
                cart[i].Quantity = quantity;
            }
        }
        save();
        refresh();
    };

    var refresh = function () {
        $rootScope.$broadcast('CartModified', { "Length": cart.length });
    };

    this.getCart = getCart;
    this.addItem = addItem;
    this.addItems = addItems;
    this.save = save;
    this.remove = remove;
    this.clear = clear;
    this.persist = persist;
    this.changeQuantity = changeQuantity;
    this.refresh = refresh;
} ]);


