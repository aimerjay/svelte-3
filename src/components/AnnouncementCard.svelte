<script lang="ts">
let hoveredCard: number | null = null;
import { onMount } from 'svelte';
let carouselRef: HTMLDivElement | null = null;
let scrollAmount = 350;
// Duplicate cards for seamless infinite scroll
const baseCards = [
    {
      image: '/images/news1.png',
      alt: 'Award',
      title: 'Congratulations, Graduates!',
      description: 'We are proud to announce the graduation of our latest batch of students.',
      accentColor: 'yellow-400'
    },
    {
      image: '/images/news2.png',
      alt: 'Graduate',
      title: 'Application Period Open!',
      description: 'Applications for the next academic year are now open. Submit your application before the deadline.',
      accentColor: 'blue-400'
    },
    {
      image: '/images/news3.png',
      alt: 'Scholarship',
      title: 'Scholarship Opportunities',
      description: 'Explore our scholarship programs and find out how you can get financial support for your studies.',
      accentColor: 'teal-400'
    },
    {
      image: '/images/news4.png',
      alt: 'Library',
      title: 'Library Resources',
      description: 'Access a wide range of academic resources and study materials in our library.',
      accentColor: 'purple-400'
    },
    {
      image: '/images/news5.png',
      alt: 'Logo',
      title: 'Our Mission',
      description: 'Learn more about our mission to support students and foster academic excellence.',
      accentColor: 'red-400'
    },
    {
      image: '/images/news6.png',
      alt: 'Award',
      title: 'Alumni Success',
      description: 'Discover the success stories of our alumni and their impact in various fields.',
      accentColor: 'green-400'
    }
  ];
// Triple the cards for infinite scroll illusion
const cards = [...baseCards, ...baseCards, ...baseCards];

onMount(() => {
  if (carouselRef) {
    const cardWidth = 350 + 32;
    carouselRef.scrollLeft = cardWidth * baseCards.length;
  }
});

  function scrollCarousel(amount: number) {
    if (!carouselRef) return;
    const cardWidth = 350 + 32; // card + gap
    carouselRef.scrollBy({ left: amount, behavior: 'smooth' });
    setTimeout(() => {
      if (!carouselRef) return;
      const totalCards = cards.length;
      const middleStart = baseCards.length;
      const middleEnd = baseCards.length * 2;
      const index = Math.round(carouselRef.scrollLeft / cardWidth);
      // If near start, reset to middle set
      if (index < middleStart) {
        carouselRef.scrollLeft = cardWidth * (middleStart + (index % baseCards.length));
      }
      // If near end, reset to middle set
      else if (index >= middleEnd) {
        carouselRef.scrollLeft = cardWidth * (middleStart + (index % baseCards.length));
      }
    }, 350);
  }
</script>

<div class="announcement-carousel-container">
  <button class="announcement-carousel-btn announcement-carousel-btn-prev" aria-label="Previous" onclick={() => scrollCarousel(-350)}>
    <svg class="w-6 h-6 text-blue-700" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/></svg>
  </button>
  <div bind:this={carouselRef} class="announcement-carousel-list hide-scrollbar" onscroll={() => { scrollX = carouselRef?.scrollLeft ?? 0;}}>
    {#each cards as card, i}
      <div
        role="group"
        class="announcement-card"
        class:scale-105={hoveredCard === i}
        class:shadow-2xl={hoveredCard === i}
        onmouseenter={() => hoveredCard = i}
        onmouseleave={() => hoveredCard = null}
      >
        <!-- Image section: square, full width, rounded top corners -->
  <div class="announcement-card-image-wrapper">
          <img
            src={card.image}
            alt={card.alt}
            class="announcement-card-image"
          />
        </div>
        <!-- Content section: white, centered -->
        <div class="announcement-card-content">
          <h3 class="announcement-card-title">{card.title}</h3>
          <p class="announcement-card-description">{card.description}</p>
        </div>
      </div>
    {/each}
  </div>
  <button  class="announcement-carousel-btn announcement-carousel-btn-next" aria-label="Next" onclick={() => scrollCarousel(350)}>
    <svg class="w-6 h-6 text-blue-700" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>
  </button>
</div>
