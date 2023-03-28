plugins {
    id("org.siouan.frontend-jdk11")
}

buildscript {
    dependencies {
        classpath("org.siouan:frontend-gradle-plugin-jdk11:6.0.0")
    }
}

frontend {
    nodeDistributionProvided.set(false)
    nodeVersion.set("18.15.0")
    nodeInstallDirectory.set(project.layout.projectDirectory.dir("node"))

    assembleScript.set("run build")
    cleanScript.set("run clean")
    checkScript.set("run check")
}

apply(plugin = "org.siouan.frontend-jdk11")