# Simple Message System
SMS is fullstack application, with Java + Spring on the backend and HTML + CSS + JS on front end, handling group chat where you can send and receive messages using your private account.

## Software
- Java 21
- Spring 3.3.5
- MongoDB 8.0.3
- IntelliJ Ultimate Edition 2024.2.4
- And many depedencies listed [here](build.gradle)

## UML Chart
![sms-uml (1)](https://github.com/user-attachments/assets/10fdd3d0-0c0c-411f-a275-4a26c3428028)

#Code review
Szymon Wójtowicz have sent
```
Code review grupy: Maksymilian Ryder i Jan Cichy.
- projekt ma na celu obsługę wysyłania wiadomości tekstowych
- używa on javy do obsługi logiki (backend) oraz html, js i css do obsługi strony wizualnej (frontendu)
- kod jest podzielony na wiele plików, każdy obsługujący inną klasę/sekcję kodu.
- 2 główne klasy to user i message
- user dziedziczy z UserService oraz klas obsługujących wyjątki
- z klasy typu ChatMessageDuo dziedziczą zarówno ChatMessage i Chat Controller.
- projekt zachowuje wszystkie zasady pisania - unika redundancji kodu, używa zrozumiałyc
```

Szymon Wójtowicz have received
```
1. Nazwy klas z wielkiej litery
2. Brak zachowania zasad SOLID
3. Brak zachowania zasad programowania obiektowego (np. enkapsulacji)
4. Puste metody
5. Nie powinno stosować się kontenera Vector<T> tylko ArrayList<T>
6. Brak spacji między operatorami
7. Operacje IO na głównym wątku
8. Metody nie obsługują wyjątków
9. Brak customowych wyjątków
10. Zamiast tworzyć gettery i settery można użyć biblioteki lombok
11. Każda klasa powinna być w osobnym pliku
12. Pliki powinny znajdować się w odpowiednich packege'ach
13. Scannery i Writery można zastosować w syntezie z try jako 'try z zasobami'
14. Zamiast klas o charakterze Model można zastosować recordy
15. Obiekty powinny być najogólniejszego typu, który spełnia założenia logiki danej funkcjonalności
```
