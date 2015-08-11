<form action="/finish" method="post" class="form">
  {{ csrf_field() }}
  <label for="gender">Anrede</label>
  <select class="form__field" name="gender">
    <option value="">Bitte w&auml;hlen</option>
    <option value="0">Frau</option>
    <option value="1">Herr</option>
  </select>

  <label for="firstname">Vorname</label>
  <input class="form__field" type="text" name="firstname" placeholder="Vorname">

  <label for="lastname">Nachname</label>
  <input class="form__field" type="text" name="lastname" placeholder="Nachname">

  <label for="email">E-Mail</label>
  <input class="form__field" type="text" name="email" placeholder="E-Mail">

  <label for="street">Stra&szlig;e</label>
  <input class="form__field" type="text" name="street" placeholder="Str&szlig;e">

  <label for="nr">Hausnummer</label>
  <input class="form__field" type="text" name="nr" placeholder="Hausnummer">

  <label for="zip">PLZ</label>
  <input class="form__field" type="text" name="zip" placeholder="PLZ">

  <label for="city">Stadt</label>
  <input class="form__field" type="text" name="city" placeholder="Stadt">

  <label for="country">Land</label>
  <select class="form__field" name="country">
    <option value="">Bitte w&auml;hlen</option>
    <option value="DE">Deutschland</option>
    <option value="AT">&Ouml;sterreich</option>
    <option value="CH">
      Schweiz
    </option>
  </select>

  <label for="phone">Telefon</label>
  <input class="form__field" type="text" name="phone" placeholder="Telefon">

  <label for="newsletter">
    <input class="form__field" type="checkbox" name="newsletter" value="1"> Ja, ich m&ouml;chte den Newsletter abonnieren.
  </label>

  <button type="submit">Absenden</button>
</form>
