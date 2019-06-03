# Frontend `localStorage` Extension

This library provides tools on how to:

-   Check if `localStorage` is supported
-   Check if `localStorage` has an Item
-   Get the amount of space left in `localStorage`
-   Get the maximum amount of space in `localStorage`
-   Get the used space in `localStorage`
-   Get a Backup of `localStorage`
-   Apply a Backup to `localStorage`
-   Dump all information of `localStorage` in the console

## Example

    console.log('LocalStorage supported:', LocalStorage.isSupported)
    // true https://caniuse.com/#search=localstorage (except Opera Mini)

    if(LocalStorage.isSupported) {

        localStorage.setItem('asd', 'ASDASD')
        // sets or overwrites the item "asd"

        var backup = LocalStorage.getBackup()
        // creates an backup, we will need it later!

        console.log(JSON.stringify(backup))
        // this is how the backup looks like

        // The maximum storage-space possible in my tests: ~5MB
        //  - 5242880 Chrome, Firefox
        //  - 5000000 Edge, IE

        var usedSpace = LocalStorage.getUsedSpace()
        console.log('Used Space:', usedSpace)

        var maxSpace = LocalStorage.getMaximumSpace()
        console.log('Maximum Space:', maxSpace)

        var remSpace = LocalStorage.getRemainingSpace()
        console.log('Remaining Space:', remSpace)

        console.log('SpaceCheck', maxSpace === usedSpace + remSpace)
        // true 😉

        console.log('hasItem', LocalStorage.hasItem('nothis0ne'))
        // we don't have this one in our localStorage

        localStorage.clear()
        // oops, we deleted the localStorage!

        console.log('has asd', LocalStorage.hasItem('asd'))
        // item "asd" is lost 😒

        LocalStorage.applyBackup(backup)
        // but we have a backup, restore it!

        LocalStorage.consoleInfo()
        // show all the info we have, see the backup worked 😊
    }

## FAQ

-   [\[link\]][1] How to store Objects or Arrays in `localStorage` \*
-   [\[link\]][2] How to store an Array in `localStorage` \*
-   [\[link\]][3] How to save an Image in `localStorage`
-   [\[link\]][4] `localStorage` Tutorial (also covers _storage events_ and _things to remember_)

\* Spoiler: Use `JSON.stringify()` and `JSON.parse()`

## Other

-   [\[link\]][5] General Information about Web Storage
-   [\[link\]][6] `sessionStorage` data stored gets cleared when the page session ends
-   [\[link\]][7] `indexedDB` a low-level API for client-side storage of structured data
-   [\[link\]][8] StackOverflow post

[1]: https://stackoverflow.com/q/2010892/4339170
[2]: https://stackoverflow.com/q/3357553/4339170
[3]: https://stackoverflow.com/q/19183180/4339170
[4]: http://www.sitepoint.com/an-overview-of-the-web-storage-api/
[5]: https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API
[6]: https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage
[7]: https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API
[8]: https://stackoverflow.com/questions/34245593/html5-localstorage-useful-functions-javascript-typescript/34245594
