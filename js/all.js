let app = new Vue({
    el: '#app',
    data: {
        product: [{
                id: 'RSU0rK9wEaXteIpwDwUjb6ghh8506thuowTsQqbfViRqjql1OP15UcIaWzqFQZgW',
                title: '摩卡巧克力',
                category: '飲品',
                content: '摩卡巧克力',
                description: '現磨拿鐵配上特製巧克力醬',
                imageUrl: 'https://images.unsplash.com/photo-1558388728-b8076e41dbac?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
                enable: false,
                origin_price: 180,
                price: 120,
                unit: '杯',
            },
            {
                id: 'akjwHtd56Yk9CBsVr2NqM8CfqdlhJf6CZvv939QOWeCUPlYvSxwTxFTuo7dFMhKG',
                title: '盛夏嘉年華',
                category: '飲品',
                content: '盛夏嘉年華',
                description: '酸酸甜甜的綜合果汁',
                imageUrl: 'https://images.unsplash.com/photo-1485265449635-ca623a55e95c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
                enable: true,
                origin_price: 250,
                price: 180,
                unit: '杯',
            }
        ],
        tempProduct: {} // 暫存要處裡的產品資料
    },
    methods: {
        updateProduct() {
            if (this.tempProduct.id) { // 如果已存在id -> 編輯
                const id = this.tempProduct.id;
                const vm = this;
                vm.product.forEach(function(item, index) {
                    if (item.id === id) {
                        vm.product[index] = vm.tempProduct;
                    }
                    Swal.fire({
                        toast: true,
                        title: '修改成功!',
                        icon: 'success',
                        showConfirmButton: false,
                        timer: 1500,
                        padding: '2rem'
                    })
                });
            } else { // 如果沒有id -> 新增
                const id = new Date().getTime(); // Unix Timestamp
                this.tempProduct.id = id;
                this.product.push(this.tempProduct);
                Swal.fire({
                    toast: true,
                    title: '新增成功!',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1500,
                    padding: '2rem'
                })
            }
            this.tempProduct = {};
            $('#productModal').modal('hide');
        },
        delProduct() {
            const id = this.tempProduct.id;
            const vm = this;
            this.product.forEach(function(item, index) {
                if (item.id === id) {
                    vm.product.splice(index, 1);
                }
            })
            this.tempProduct = {};
            $('#delModal').modal('hide');
            Swal.fire({
                toast: true,
                title: '刪除成功!',
                icon: 'success',
                showConfirmButton: false,
                timer: 1500,
                padding: '2rem'
            })
        },
        openModal(isNew, item) {
            switch (isNew) {
                case 'new':
                    this.tempProduct = { enable: false };
                    $('#productModal').modal('show');
                    break;

                case 'edit':
                    this.tempProduct = Object.assign({}, item);
                    $('#productModal').modal('show');
                    break;
                case 'delete':
                    this.tempProduct = Object.assign({}, item);
                    $('#delModal').modal('show');
                    break;
            }
        }
    }
});