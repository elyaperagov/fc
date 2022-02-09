<template>
  <section class="company">
    <h3 class="company__background-title">
      <p>Formal</p>
      <p>Crypto</p>
    </h3>
    <div class="company__blob">
      <svg
        width="419"
        height="419"
        viewBox="0 0 419 419"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g filter="url(#filter0_f_1_1593)">
          <circle cx="209.5" cy="209.5" r="81.5" fill="#00FFC5" />
        </g>
        <defs>
          <filter
            id="filter0_f_1_1593"
            x="0"
            y="0"
            width="419"
            height="419"
            filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"
          >
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
            <feGaussianBlur stdDeviation="64" result="effect1_foregroundBlur_1_1593" />
          </filter>
        </defs>
      </svg>
    </div>

    <div class="container">
      <h2>Company</h2>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Company'
}
</script>

<style lang="scss" scoped>
@for $i from 1 through 2 {
  $a: #{($i + 1) * 90};
  $b: #{($i + 1) * 90+360};

  svg:nth-child(#{$i}) {
    animation: move#{$i} #{($i) + 14}s infinite linear;
    cursor: grab;
  }

  @keyframes move#{$i} {
    from {
      transform: rotate(#{$a}deg) translate(#{(($i + 1)) * 75}px, 0.1px) rotate(-#{$a}deg);
    }
    to {
      transform: rotate(#{$b}deg) translate(#{(($i + 1)) * 75}px, 0.1px) rotate(-#{$b}deg);
    }
  }
  @media (max-width: 767px) {
    @keyframes move#{$i} {
      from {
        transform: rotate(#{$a}deg) translate(#{(($i + 1)) * 25}px, 0.1px) rotate(-#{$a}deg);
      }
      to {
        transform: rotate(#{$b}deg) translate(#{(($i + 1)) * 25}px, 0.1px) rotate(-#{$b}deg);
      }
    }
  }
}
</style>
