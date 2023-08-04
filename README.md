#Folder
`
    assets: Asset folder to store all images, vectors, fonts, etc.
    src: This folder is the main container of all the code inside your application.
        components: Folder to store any common component that you use through your app (such as a generic button)
        constants: Folder to store any kind of constant that you have.
        routes: Folder to store the navigators.
        redux: This folder should have all your reducers and store
        views: Folder that contains all your application screens/features.
        helper: Common api controller.
        utils: Folder to store any common function such as calcutate radius, different date formatting functions
    App.js: Main component that starts your whole app.
    index.js: Entry point of your application as per React-Native standards.
`
#Template
`https://codecanyon.net/item/foodrush-react-native-ecommerce-app-template/screenshots/43384123?index=0`

#ICON
`https://freeicons.io/line-icons-2/home-icon-30700#`

# BUild
rm -rf ios/Podfile.lock
➜ rm -rf package-lock.json  node_modules
➜ rm -rf Gemfile.lock                               
➜ rm -rf vendor
➜ yarn


"@react-native-community/async-storage": "^1.12.1",


# Loading 
`https://www.npmjs.com/package/react-content-loader#examples
`


#Tao APK

keytool -genkey -v -keystore your_key_name.keystore -alias your_key_alias -keyalg RSA -keysize 2048 -validity 10000

Tạo thông tin
cd android && ./gradlew assembleRelease



react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/build/intermediates/res/merged/release/


##
`
    react-native-async-storage/async-storage
`
