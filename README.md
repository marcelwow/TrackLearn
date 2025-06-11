# TrackLearn - Aplikacja do Śledzenia Postępów w Nauce

## Opis
TrackLearn to aplikacja webowa, która pomaga użytkownikom śledzić ich postępy w nauce różnych przedmiotów. Aplikacja umożliwia rejestrację, logowanie, dodawanie przedmiotów i monitorowanie postępów w nauce.

## Wymagania
- Node.js (wersja 14 lub nowsza)
- MongoDB Atlas (konto)
- npm (Node Package Manager)

## Instalacja

1. Sklonuj repo
```bash
git clone [URL_REPOZYTORIUM]
cd TrackLearn-main
```

2. Zainstaluj zależności:
```bash
npm install
```

3. Skonfiguruj połączenie z bazą danych:
   - Otwórz plik `config.js`
   - Wypełnij pola `DB_USER` i `DB_PASS` swoimi danymi dostępowymi do MongoDB Atlas
   - Przykład:
   ```javascript
   const DB_USER = "nazwa_uzytkownika";
   const DB_PASS = "haslo";
   ```

4. Uruchom aplikację:
```bash
npm start
```

Aplikacja będzie dostępna pod adresem `http://localhost:3000`

## Funkcjonalności

### Rejestracja i Logowanie
- Rejestracja nowego konta
- Logowanie do istniejącego konta
- Wylogowywanie z systemu

### Zarządzanie Przedmiotami
- Dodawanie nowych przedmiotów
- Przeglądanie listy przedmiotów
- Usuwanie przedmiotów
- Dodawanie postępów do przedmiotów
- Możliwość zaznaczania czy przedmiot jest zdany lub tez nie

## Konfiguracja
Wszystkie ustawienia aplikacji znajdują się w pliku `config.js`:
- `PORT` - port na którym działa aplikacja (domyślnie 3000)
- `DB_USER` - nazwa użytkownika MongoDB Atlas
- `DB_PASS` - hasło użytkownika MongoDB Atlas
- `MONGODB_URI` - connection string do bazy danych (automatycznie generowany)
- `SESSION_SECRET` - klucz szyfrowania sesji

## Rozwiązywanie Problemów

### Typowe Problemy
1. Problem z połączeniem do MongoDB
   - Sprawdź czy dane logowania w `config.js` są poprawne
   - Upewnij się, że Twoje IP jest dozwolone w MongoDB Atlas
   - Sprawdź czy baza danych "shop" istnieje

2. Błędy podczas instalacji
   - Upewnij się, że masz zainstalowany Node.js
   - Spróbuj usunąć folder node_modules i wykonać `npm install` ponownie

3. Problemy z sesją
   - Wyczyść ciasteczka przeglądarki
   - Sprawdź czy port 3000 nie jest zajęty

