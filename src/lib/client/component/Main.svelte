<div class="main-container">
  <div class="main">
    <slot />
  </div>
</div>

<style>
  .main-container {
    position: relative;
    width: 100%;
    min-height: 100vh;
    height: max-content;

    display: flex;
    justify-content: center;
    align-items: start;
  }

  .main {
    position: relative;
    width: calc(min(99%, 75em));
    height: calc(min(99%, fit-content));
    
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
    box-sizing: border-box;
  }

  @media only screen and (max-width: 600px) {

    .main-container {
      top: 6rem;
      justify-content: flex-start;
      align-items: flex;
      width: 100%;
      height: auto;
    }

    .main {
      width: 100%;
      height: auto;
      padding: 1rem;
      box-sizing: border-box;
    }
  }
</style>
