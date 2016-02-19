function filter(name, op, val) {
        this.name = name;
        this.op = op;
        this.val = val;
}

function query() {
    this.filters = new Array();
    this.addFilter = function(name, op, val) {
        this.filters.push(new filter(name,op,val));  
    }
}

function productQuery() {
    this.q = new query();
    this.minPrice = function(price) {
        this.q.addFilter("Price", ">=", price);
    }
    this.maxPrice = function(price) {
        this.q.addFilter("Price", "<=", price);
    }
    this.storageType = function(type) {
        this.q.addFilter("Storage", "like", "%" + type + "%");
    }
    this.execute = function(callback) {$.ajax({url :"/api/specs",
                                       type : "get",
                                       data : {q : JSON.stringify(this.q)},
                                       success : callback});
                              }
}