<script lang="ts">
  export let image = "/images/library.jpg";
  export let title = "About Our Foundation";
  export let description = "Our scholarship foundation is dedicated to empowering students and supporting their academic journey. We partner with hundreds of institutions and sponsors to provide opportunities for growth, learning, and success. Join us in making a difference.";
</script>

<section class="about-section-container">
  <div class="about-section-content">
  <h2 class="about-section-title">{title}</h2>
  <p class="about-section-description">
      {description}
      <br /><br />
      We believe every student deserves a chance to succeed, regardless of their background. Our programs are designed to foster academic excellence, personal growth, and leadership skills. Through our network of sponsors and partner institutions, we provide not only financial support but also mentorship and career guidance. Discover how you can be part of our mission and help shape the future of education.
    </p>
  </div>
  <div class="about-section-image-wrapper">
  <img src={image} alt={title} class="about-section-image" />
  </div>
</section>


