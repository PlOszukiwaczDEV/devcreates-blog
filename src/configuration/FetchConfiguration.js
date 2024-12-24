let ConfigurationURL = `./configuration/Configuration.yml?v=${Timestamp}`
let ExampleConfiguration = false

async function FetchConfiguration() {
  var xhr = new XMLHttpRequest()
  xhr.open("GET", ConfigurationURL, true)
  xhr.onreadystatechange = async function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      var res = jsyaml.load(xhr.responseText)
      window.Configuration = res
      await RenderConfiguration()
      return;
    }
    if (xhr.readyState == 4 && xhr.status == 404) {
      if(!ExampleConfiguration) {
        ExampleConfiguration = true
        ConfigurationURL = `./configuration/Configuration.example.yml?v=${Timestamp}`
        FetchConfiguration()
      } else {
        await RenderConfiguration()
        return console.error("Configuration.yml could not be found!")
      }
    }
  }
  xhr.send()
}