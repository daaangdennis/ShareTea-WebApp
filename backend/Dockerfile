#Use Maven Build Image
FROM openjdk:21-jdk-slim AS Build

#Set working directory
WORKDIR /backend

#Copy maven files over to the docker container
COPY pom.xml .

#Build the SpringBoot App with Maven
RUN mvn clean install

#Expose the port of the springboot app 
EXPOSE 8080

#Run the springboot application
CMD ["java", "-jar", "target/backend-0.0.1-SNAPSHOT.jar"]