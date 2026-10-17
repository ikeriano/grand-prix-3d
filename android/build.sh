set -e
export JAVA_HOME=~/jdk17 PATH=~/jdk17/bin:$PATH
BT=~/android-sdk/build-tools/34.0.0; PLAT=~/android-sdk/platforms/android-34/android.jar
cd /workspace/grandprix/android; rm -rf build; mkdir -p build/res build/gen build/classes build/dex
$BT/aapt2 compile --dir res -o build/res/res.zip
rm -rf assets && mkdir -p assets && cp -r ../dist assets/www && rm -f assets/www/.nojekyll assets/www/GrandPrix3D.apk && true
$BT/aapt2 link -o build/base.apk -I $PLAT --manifest AndroidManifest.xml -A assets --java build/gen build/res/res.zip --min-sdk-version 24 --target-sdk-version 34 -0 mp4 -0 mp3 -0 webp -0 png
javac -source 8 -target 8 -Xlint:-options -bootclasspath $PLAT -classpath $PLAT -d build/classes $(find src build/gen -name '*.java')
$BT/d8 --min-api 24 --lib $PLAT --output build/dex $(find build/classes -name '*.class')
cp build/base.apk build/unsigned.apk; python3 -c "import zipfile;z=zipfile.ZipFile('build/unsigned.apk','a',zipfile.ZIP_DEFLATED);z.write('build/dex/classes.dex','classes.dex');z.close()"
$BT/zipalign -f -p 4 build/unsigned.apk build/aligned.apk
$BT/apksigner sign --ks /workspace/handoff/keystore/grandprix/grandprix.jks --ks-pass file:/workspace/handoff/keystore/grandprix/.pass --out ../GrandPrix3D.apk build/aligned.apk
$BT/apksigner verify --print-certs ../GrandPrix3D.apk | head -3
$BT/aapt dump badging ../GrandPrix3D.apk | head -6
ls -la ../GrandPrix3D.apk
