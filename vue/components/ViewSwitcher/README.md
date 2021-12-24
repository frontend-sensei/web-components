# ViewSwitcher component

Component renders buttons with icons inside,
clicking on which changes the active view.

### Usage

1. Import "ViewSwitcher" component into your component
2. Prepare "views" and "activeView" in your component

```sh
...
data() {
 return {
   activeView: '',
   views: [
     {
       name: 'board',
       iconName: 'TwoColumnsIcon'
     },
     {
       name: 'list',
       iconName: 'ListIcon'
     }
   ]
 }
}
```

3. Paste markdown and pass "views" and "activeView" properties

```sh
<view-switcher
    v-model="activeView"
    :views="views"
/>
```
