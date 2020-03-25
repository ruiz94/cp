console.log("estoy en vueMain.js");
// var producto = "Socks"
var eventBus = new Vue()
Vue.component('shipping-details-tabs', {
    props: {
        shipping: {
            type: String,
            required: true
        },
        details: {
            type: Array,
            required: false
        }
    },
    template: `
        <div>
            <div class="tabs-2">
                <span class="tab-2"
                    v-for="(tab, index) in tabs"
                    :class="{activeTab: selectedTab == tab}"
                    @click="selectedTab = tab"
                >{{ tab }}</span>
            </div>

            <div class="shipping-details-tabs">
                <div class="section-shipping" :class="{selectedTab_content: selectedTab === 'Shipping'}">
                    <p>{{ shipping }}</p>
                </div>
                <div class="section-details" :class="{selectedTab_content: selectedTab === 'Details'}">
                    <product-details :details="details"></product-details>
                </div>
            </div>
        </div>
    `,
    data(){
        return {
            tabs: ['Shipping', 'Details'],
            selectedTab: 'Shipping'
        }
    }
})
Vue.component('product-tabs', {
    props: {
        reviews: {
            type: Array,
            required: false
        }
    },
    template: `
    <div class="bottom">
        <div class="tabs">
            <span class="tab" 
                v-for="(tab, index) in tabs" 
                @click="selectedTab = tab"
                :class="{ activeTab: selectedTab === tab}"
            >{{ tab }}</span>
        </div>

        <div class="section-reviews" v-show="selectedTab === 'Reviews'">
            <p v-if="!reviews.length" class="no-reviews">There are no reviews yet.</p>
            
            <div v-else>
                <div class="u-review" v-for="(review, index) in reviews">
                    <div class="head">
                        <span class="user">User: {{ review.name }}</span>
                        <span class="fecha">Fecha: {{ review.date }}</span>
                    </div>
                    <p class="rating">Rating: {{ review.rating }}</p>
                    <div class="rev">
                        <span class="title">Review:</span>
                        <p class="desc-review">{{ review.review }}</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="reviews" v-show="selectedTab === 'Make a Review'">
            <product-review ></product-review>
        </div>
    </div>
    `,
    data(){
        return {
            tabs: ['Reviews', 'Make a Review'],
            selectedTab: 'Reviews'
        }
    }
})
Vue.component('product-review', {
    template: `
    <form class="review-form" @submit.prevent="onSubmit">
        <p>
            <label for="name">Name:</label>
            <input id="name" v-model="name" placeholder="name">
        </p>

        <p>
            <label for="review">Review:</label>
            <textarea id="review" v-model="review" cols="30" rows="5"></textarea>
        </p>

        <p>
            <label for="rating">Rating:</label>
            <select id="rating" v-model.number="rating">
                <option>5</option>
                <option>4</option>
                <option>3</option>
                <option>2</option>
                <option>1</option>
            </select>
        </p>

        <p>
            <p >Would you recommend this product: </p>
            <span>
                Yes <input type="radio" v-model="recommend" value="Yes">
            </span>
            <span>
                Not <input type="radio" v-model="recommend" value="No">
            </span>
        </p>

        <p class="btn-input">
            <input type="submit" value="Post">
        </p>
        <div class="section-errors" :class="{ have_errors: errors.length > 0 }">
            <p v-if="errors.length"  >
                <b class="error">Please correct the following error(s):</b>
                <p>
                    <ul class="error"><li v-for="error in errors">{{ error }}</li></ul>
                </p>
            </p>
        </div>
    </form>
    `,
    data(){
        return{
            name: null,
            review: null,
            rating: null,
            recommend: null,
            errors: []
        }
    },
    methods: {
        onSubmit(){
            if (this.name && this.review && this.rating && this.recommend) {
                var hoy = new Date();
                var fecha = hoy.getDate() + '-' + ( hoy.getMonth() + 1 ) + '-' + hoy.getFullYear();
                let productReview = {
                    name: this.name,
                    date: fecha,
                    review: this.review,
                    rating: this.rating,
                    recommend: this.recommend
                }
                eventBus.$emit('review-submitted', productReview)
                this.name = null
                this.review = null
                this.rating = null
                this.recommend = null
                this.errors = []
            }else{
                if(!this.name) this.errors.push("Name required.")
                if(!this.review) this.errors.push("Review required.")
                if(!this.rating) this.errors.push("Rating required.")
                if(!this.recommend) this.errors.push("Recommend required.")
            }
        }
    }
})
Vue.component('product-details', {
    props:{
        details: {
            type: Array,
            required: true
        }
    },
    template: `
        <ul>
            <li v-for="detail in details">{{ detail }}</li>
        </ul>
    `
})
Vue.component('product', {
    props: {
        premium: {
            type: Boolean,
            required: true
        }
    },
    template: `
        <div class="product">
            <section class="top">
                <div class="product-image">
                    <img class="img-cart" :src="image" >
                </div>

                <div class="product-info">
                    <h1>{{ title }}</h1>
                    <p v-if="inStock">In Stock</p>
                    <p v-else :class="{outOfStock: !inStock}">Out of Stock</p>

                    <shipping-details-tabs :shipping="shipping" :details="details"></shipping-details-tabs>
                    
                    <h3>Colors</h3>
                    <div class="colors">
                        <div class="color" v-for="(variant, index) in variants" 
                            :key="variant.variantId"
                            :style="{backgroundColor: variant.variantColor}"
                            @mouseover="updateProduct(index)">
                        </div>
                    </div>
                    
                    <h3>Add to cart</h3>
                    <div class="cart-btn">

                        <button v-on:click="addToCart(1)" 
                            :disabled="!inStock"
                            :class="{disabledButton: !inStock}" class="add">+</button>
                        <button v-on:click="addToCart(0)" class="del">-</button>
                    </div>

                </div>
            </section>
            
            <product-tabs :reviews="reviews"></product-tabs>
        </div>
    `,
    data(){
        return {
            product: "Socks",
            brand: 'Vue Mastery',
            selectedVariant: 0,
            // image: "https://images-na.ssl-images-amazon.com/images/I/6163gIGxNLL._UX522_.jpg",
            // altText: 'only a sock',
            // href: 'https://images-na.ssl-images-amazon.com/images/I/6163gIGxNLL._UX522_.jpg',
            // inStock: true,
            // inventory: 0,
            // onSale: true
            details: ["80% cotton", "20% polyester", "Gender-neutral"],
            variants: [
                {
                    variantId: 2234,
                    variantColor: 'green',
                    variantImage: "https://images-na.ssl-images-amazon.com/images/I/6163gIGxNLL._UX522_.jpg",
                    variantQuantity: 10
                },
                {
                    variantId: 2235,
                    variantColor: "blue",
                    variantImage: "https://www.tiemart.com/media/catalog/product/cache/6b1c09900b407c50fce2db5e66ebc123/m/e/mens-royal-blue-socks.jpg",
                    variantQuantity: 0
                }
            ],
            reviews: []
        }
    },
    methods: {
        addToCart(id){
            this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId, id)
        },
        updateProduct(index){
            this.selectedVariant = index
        },
        // addReview(productReview){
        //     this.reviews.push(productReview)
        // },
        
    },
    computed: {
        title(){
            return this.brand + ' ' + this.product
        },
        image(){
            return this.variants[this.selectedVariant].variantImage
        },
        inStock(){
            return this.variants[this.selectedVariant].variantQuantity
        },
        shipping(){
            if(this.premium){
                return 'Free'
            }else{
                return 2.99
            }
        }
    },
    mounted(){
        eventBus.$on('review-submitted', productReview => {
            this.reviews.push(productReview)
        })
    }
})

var app = new Vue({
    el: '#app',
    data: {
        premium: true,
        cart: []
    },
    methods:{
        updateCart(id_art, id){
            if (id) {
                this.cart.push(id_art)
            }else{
                if (this.cart.length > 0) {
                    let index = this.cart.indexOf(id_art)
                    this.cart.splice(index, 1)
                }
            }
        }
    }
})