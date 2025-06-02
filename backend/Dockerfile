# Usa un’immagine base con Java 17
FROM eclipse-temurin:17-jdk

# Imposta la directory di lavoro all’interno del container
WORKDIR /app

# Copia lo script Maven Wrapper e il file pom.xml nella directory di lavoro
COPY mvnw pom.xml ./

# Copia la cartella .mvn (necessaria al Maven Wrapper)
COPY .mvn/ .mvn

# Rendi eseguibile lo script mvnw
RUN chmod +x mvnw

# Risolvi le dipendenze con Maven (il wrapper mvnw ora è eseguibile)
RUN ./mvnw dependency:resolve

# Copia il codice sorgente all’interno di /app/src
COPY src ./src

# (Opzionale) Esponi la porta 8080, che Spring Boot usa di default
EXPOSE 8080

# Comando di avvio: usa il Maven Wrapper per lanciare Spring Boot
CMD ["./mvnw", "spring-boot:run"]

