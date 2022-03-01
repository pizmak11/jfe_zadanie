1. Do struktury dodałem:
    <meta name="viewport" content="width=device-width, initial-scale=1">
dla lepszego skalowania treści dla urządzeń mobilnych. Skrypty podzieliłem na mniejsze części dla wiekszej przejrzystości. Również utworzyłem foldery "js", "css" oraz "imgs" i tam dodałem odpowiednie pliki.
Dodałem również przycisk regulujący kontrast:
    <button class="button button--contrast" onclick="contrast()">
        <img class="contrast__img" src="imgs/dark.svg" alt="Change contrast">
    </button>

2. Do headingu dodałem jedynie powyższy przycisk. Komponent z listą kanałów i ich modyfikacjami znajduje się w pliku "js/channels.js".

3.
a. Dodałem sortowanie rosnąco i malejąco i oddzielono je od typu sortowania. Typ i kierunek sortowania współgra ze sobą - można go mieszać.
b. Filtrowanie wyników odbywa sie dynamicznie. Po wpisaniu znaku tytuły z listy kanałów są porównywane z inputem, widoczne kanały są czyszczone i wyrzucana jest nowa lista. Dodatkowe jeśli lista jest pusta wyskoczy komunikat informujący o braku rezultatów wyszukiwania.
c. Clear czyści input z filtrowanym tekstem. Niestety z niezannego mi powodu kolejność w zmiennej zawierającej domyślną listę "channelsDefault" zapamiętuje ostatnią kolejność elementów. Co za tym idzie przycisk nie sortuje ponownie kanałów, a jedynie filtrowanie tekstem.
d. Kafelek jest buttonem, któremu przypsałem funkcję "window.open()". Dzięki temu do linku możliwe było dodanie aktualnego timestampa i otwarcie go w nowej karcie.
e. Do dodania przecinków użyłem RegEx.

4. Stronę przetestowałem na Google Chrome, OperaGX oraz Microsoft Edge. Kod nie jest zgodny z przeglądarką Internet Explorer - nie jestem masochistą by pod nią optymalizować ;).
Początkowo planowałem użycia <a> zaniast <button> dla przycisków kanałów, jednak nie znalezłem metody pozwalającej na dodanie do href aktualnego timestampa. Funkcja wywoływana przyciskiem, dodanie do adresu timeastampa i przekierowanie strony dalej rozwiązało ten problem.

Dodatkowe:
1. Dodano przycisk zmieniający kontrast wraz z ikonami w formacie svg. Do zmiany kontrastu użyto klasy nakładanej na <body>, do której dodano filter: invert(1). Obrazy wewnątrz tej klasy również mają nałożony filtr odwracając je ponownie - dzięki temu obrazy pozostają w prawidłowej kolorystyce.
2. W pliku "js/pageViews.js" znajduje się kod zapisujący dane o wejściach w localStorage.

Ograniczenia:
1. Nie użyłem żadnych frameworków.
2. Frameworka CSS również nie użyłem.
3. Bloki kanałów tworzone i ładowane są dynamicznie. Listę JSON załadowałem metodą "import" i przypisałem do zmiennej channelsDefault uzyskany obiekt.
4. Niestety nie znam tego zagadnienia.

Customowo dodałem animację dla przycisków kanałów on hover.