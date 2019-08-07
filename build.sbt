name := """scala-play-react-seed"""

version := "1.0-SNAPSHOT"

lazy val root = (project in file(".")).enablePlugins(PlayScala).settings(
  watchSources ++= (baseDirectory.value / "public/ui" ** "*").get
)

resolvers += Resolver.sonatypeRepo("snapshots")

scalaVersion := "2.12.8"

libraryDependencies += guice
libraryDependencies += "org.scalatestplus.play" %% "scalatestplus-play" % "3.1.2" % Test
libraryDependencies += "com.h2database" % "h2" % "1.4.196"

//libraryDependencies += "com.google.firebase" % "firebase-admin" % "4.1.1"
//libraryDependencies += "com.firebase" % "firebase-client" % "2.2.4"
//libraryDependencies += "com.google.firebase" % "firebase-server-sdk" % "3.0.1"
libraryDependencies += "com.github.firebase4s" %% "firebase4s" % "0.0.4"