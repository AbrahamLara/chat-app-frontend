<template>
  <div class="about-container pa-sai pt-5 pt-lg-0">
    <div class="headline">About</div>
    <div class="body-1 pt-3">
      ChatApp is a mock WhatsApp application which this project was also
      inspired by. The idea behind this project was to recreate the basic
      features and functionalities that exist within WhatsApp.
    </div>
    <div class="body-1 pt-3">
      I mainly started this project in order to demonstrate and apply what I've
      learned working with the tools and technologies used to create this
      project.
    </div>
    <div class="headline mt-9">Description</div>
    <div class="body-1 pt-3">
      Users are able to Signup and Login to begin chatting with other users on
      the platform. Users will be able to tell when other users are typing in
      real-time.
    </div>
    <div class="headline mt-9">Technologies</div>
    <div class="ml-3">
      <div class="heading pt-3">Frontend</div>
      <ul class="ml-2">
        <li>TypeScript</li>
        <li>Vue</li>
        <li>Sass</li>
        <li>Webpack</li>
        <li>Jest</li>
      </ul>
    </div>
    <div class="ml-3">
      <div class="heading pt-3">Backend</div>
      <ul class="ml-2">
        <li>Typescript</li>
        <li>Express.js</li>
        <li>Docker</li>
        <li>Sequelize</li>
        <li>Jest</li>
      </ul>
    </div>
    <div class="heading pt-3 ml-3">Database — PostgreSQL</div>
  </div>
</template>

<style lang="sass">
@use '../styles/vuetify-vars' as v

//noinspection Stylelint
@media screen and (min-width: map-get(v.$grid-breakpoints, 'md'))
  .about-container
    width: 600px
</style>
