# PV-Strombilanz v4 – Cloud-Version

Version 4.2

- Supabase-Anmeldung mit E-Mail und Passwort
- Lokale Speicherung bleibt als Fallback bestehen
- Monatsdaten und OeMAG-Daten können in Supabase gespeichert und geladen werden
- Beim ersten Login wird angeboten, vorhandene lokale Monats- und OeMAG-Daten zu übernehmen
- Benötigt die vier Tabellen und RLS-Policies aus der zuvor ausgeführten SQL-Anweisung

Wichtig:
- Supabase URL und Publishable Key sind im Frontend konfiguriert; niemals Secret/service_role Keys im Frontend eintragen.
- E-Mail-Bestätigung kann in Supabase Auth erforderlich sein.
- Cloud-Sync deckt derzeit Monats- und OeMAG-Daten ab. Investitionen/Einstellungen bleiben aktuell in der Oberfläche statisch und werden nicht in die Cloud synchronisiert; das muss vor produktiver Nutzung ergänzt werden.
- Vor dem ersten Login lokale Daten exportieren, um eine zusätzliche Sicherung zu haben.
