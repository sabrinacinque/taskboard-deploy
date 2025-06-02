# -----------------------------------------------------------------
# FASE 1: BUILD → compila l’applicazione e crea il JAR
# -----------------------------------------------------------------
FROM eclipse-temurin:17-jdk AS build

# Imposta la cartella di lavoro all’interno del container
WORKDIR /app

# Copia i file necessari per il Maven Wrapper e il pom.xml
COPY mvnw pom.xml ./
COPY .mvn/ .mvn

# Rendi eseguibile lo script mvnw
RUN chmod +x mvnw

# Copia il sorgente Java (tutte le cartelle src) nella directory di lavoro
COPY src ./src

# Esegui il package Maven (salta i test per velocizzare)
RUN ./mvnw package -DskipTests


# -----------------------------------------------------------------
# FASE 2: RUNTIME → esegue solo il jar già compilato
# -----------------------------------------------------------------
FROM eclipse-temurin:17-jdk

# Cartella di lavoro per l’immagine finale
WORKDIR /app

# Copia il JAR prodotto dalla fase di build
# (è il file con estensione .jar dentro la cartella target/)
COPY --from=build /app/target/*.jar app.jar

# Esponi la porta 8080 (quella di default di Spring Boot)
EXPOSE 8080

# Comando di avvio dell’app: esegue il JAR con Java
ENTRYPOINT ["java", "-jar", "app.jar"]
