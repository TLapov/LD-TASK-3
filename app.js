class CarouselElement extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.swiperInitialized = true;

    }
  
    connectedCallback() {
      this.render();
      this.initializeSwiper();
      
      let btn = this.shadowRoot.querySelector('.toggle-swiper-button');
      const nextSwiperBtn = this.shadowRoot.querySelector('.swiper-button-next');
      const prevSwiperBtn = this.shadowRoot.querySelector('.swiper-button-prev');
      
      btn.textContent = 'Destroy swiper'
      btn.addEventListener('click', () => {
      if (this.swiperInitialized) {
            this.swiper.destroy(true, true);
            this.swiperInitialized = false;
            btn.textContent = 'Initialize swiper';
            nextSwiperBtn.classList.add('swiper-button-disabled');
            prevSwiperBtn.classList.add('swiper-button-disabled');
        
        }else {
            this.swiperInitialized = true;
            btn.textContent = 'Destroy swiper'
            this.initializeSwiper();
            nextSwiperBtn.classList.remove('swiper-button-disabled');
      }
    });
    }
  
    disconnectedCallback() {
        this.swiper.destroy(true, true);
    }
  
    render() {
      this.shadowRoot.innerHTML = `
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css" />
        <link rel="stylesheet" href="carousel.css">
        <section class="swiper-container">
            <div class="swiper">
                <div class="swiper-wrapper">
                    <div class="swiper-slide"><img src="assets/person-1.png" alt="Image 1"></div>
                    <div class="swiper-slide"><img src="assets/person-2.png" alt="Image 2"></div>
                    <div class="swiper-slide"><img src="assets/person-3.png" alt="Image 3"></div>
                    <div class="swiper-slide"><img src="assets/person-4.jpg" alt="Image 4"></div>
                </div>
                <div class="swiper-button-prev custom-prev-icon"></div>
                <div class="swiper-button-next custom-next-icon"></div>
            </div>
            <div class="toggle-swiper"> 
                <button type="button" class="toggle-swiper-button"></button>
            </div>
        </section>
      `;
    }
  
    initializeSwiper() {
        this.swiper = new Swiper(this.shadowRoot.querySelector('.swiper'), {
            direction: 'horizontal',
            navigation: {
                nextEl: this.shadowRoot.querySelector('.swiper-button-next'),
                prevEl: this.shadowRoot.querySelector('.swiper-button-prev')
            },
            slidesPerView: "auto",
            on: {
                slideChange: function() {
                    console.log('Active slide index:', this.activeIndex);
                }
            }    
        });
    }
}
  
customElements.define('carousel-element', CarouselElement);
