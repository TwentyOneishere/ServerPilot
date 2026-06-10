# React Native
-keep class com.facebook.react.** { *; }
-keep class com.facebook.hermes.** { *; }
-keep class com.facebook.jni.** { *; }
-keepclassmembers class * { @com.facebook.react.bridge.ReactMethod *; }
-keepclassmembers,allowobfuscation class * { @com.google.gson.annotations.SerializedName <fields>; }

# SSH
-keep class com.jcraft.** { *; }

# Biometrics
-keep class androidx.biometric.** { *; }

# General Android
-dontwarn com.google.android.gms.**
-keep class * extends android.app.Activity
-keep class * extends android.app.Application
-keep class * extends android.app.Service
