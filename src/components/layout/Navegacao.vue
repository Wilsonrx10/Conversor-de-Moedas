<template>
<div>
<nav class="navbar navbar-expand-lg navbar-dark bg-dark mb-3">
  <div class="container-fluid">
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">

      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
       <a class="navbar-brand" href="#"><h2>EXCHANGE-AO</h2></a>
      </ul>


      <ul class="navbar-nav">

        <li class="nav-item">
          <router-link class="nav-link" to="/">Home</router-link>
        </li>

        <li class="nav-item">
          <router-link class="nav-link" to="/observando">Observador</router-link>
        </li>

        <li class="nav-item">
          <router-link class="nav-link" to="/calcular">Calcular Câmbio</router-link>
        </li>
       
      </ul>
      
    </div>
  </div>
</nav>
</div>
</template>

<script>
export default {
  name:"navegacao_header"
}
</script>