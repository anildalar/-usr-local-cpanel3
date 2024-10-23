"use strict";(self.webpackChunkwptCpanelMain=self.webpackChunkwptCpanelMain||[]).push([[405],{92526:function(e,t,n){var r,o=this&&this.__extends||(r=function(e,t){return r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])},r(e,t)},function(e,t){function n(){this.constructor=e}r(e,t),e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)}),i=this&&this.__assign||function(){return i=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var o in t=arguments[n])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e},i.apply(this,arguments)},s=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t};Object.defineProperty(t,"__esModule",{value:!0});var a=s(n(67294)),l=s(n(73935)),c=n(32871),u=200,d=function(e){function t(t){var n=e.call(this,t)||this;return n.listRef=a.createRef(),n.ghostRef=a.createRef(),n.topOffsets=[],n.itemTranslateOffsets=[],n.initialYOffset=0,n.lastScroll=0,n.lastYOffset=0,n.lastListYOffset=0,n.needle=-1,n.afterIndex=-2,n.state={itemDragged:-1,itemDraggedOutOfBounds:-1,selectedItem:-1,initialX:0,initialY:0,targetX:0,targetY:0,targetHeight:0,targetWidth:0,liveText:"",scrollingSpeed:0,scrollWindow:!1},n.doScrolling=function(){var e=n.state,t=e.scrollingSpeed,r=e.scrollWindow,o=n.listRef.current;window.requestAnimationFrame((function(){r?window.scrollTo(window.pageXOffset,window.pageYOffset+1.5*t):o.scrollTop+=t,0!==t&&n.doScrolling()}))},n.getChildren=function(){if(n.listRef&&n.listRef.current){var e=Array.from(n.listRef.current.children);return n.props.hooks&&"function"==typeof n.props.hooks.getChildren?n.props.hooks.getChildren(e):e}return console.warn("No items found in the List container. Did you forget to pass & spread the `props` param in renderList?"),[]},n.calculateOffsets=function(){n.topOffsets=n.getChildren().map((function(e){return e.getBoundingClientRect().top})),n.itemTranslateOffsets=n.getChildren().map((function(e){return c.getTranslateOffset(e)}))},n.getTargetIndex=function(e){return n.getChildren().findIndex((function(t){return t===e.target||t.contains(e.target)}))},n.onMouseOrTouchStart=function(e){n.dropTimeout&&n.state.itemDragged>-1&&(window.clearTimeout(n.dropTimeout),n.finishDrop());var t=c.isTouchEvent(e);if(t||0===e.button){var r=n.getTargetIndex(e);if(!(-1===r||n.props.values[r]&&n.props.values[r].disabled)){var o=n.getChildren()[r],i=o.querySelector("[data-movable-handle]");if((!i||i.contains(e.target))&&!c.checkIfInteractive(e.target,o)){if(e.preventDefault(),n.props.beforeDrag&&n.props.beforeDrag({elements:n.getChildren(),index:r}),t){var s={passive:!1};o.style.touchAction="none",document.addEventListener("touchend",n.schdOnEnd,s),document.addEventListener("touchmove",n.schdOnTouchMove,s),document.addEventListener("touchcancel",n.schdOnEnd,s)}else{document.addEventListener("mousemove",n.schdOnMouseMove),document.addEventListener("mouseup",n.schdOnEnd);var a=n.getChildren()[n.state.itemDragged];a&&a.style&&(a.style.touchAction="")}n.onStart(o,t?e.touches[0].clientX:e.clientX,t?e.touches[0].clientY:e.clientY,r)}}}},n.getYOffset=function(){var e=n.listRef.current?n.listRef.current.scrollTop:0;return window.pageYOffset+e},n.onStart=function(e,t,r,o){n.state.selectedItem>-1&&(n.setState({selectedItem:-1}),n.needle=-1);var i=e.getBoundingClientRect(),s=window.getComputedStyle(e);n.calculateOffsets(),n.initialYOffset=n.getYOffset(),n.lastYOffset=window.pageYOffset,n.lastListYOffset=n.listRef.current.scrollTop,n.setState({itemDragged:o,targetX:i.left-parseInt(s["margin-left"],10),targetY:i.top-parseInt(s["margin-top"],10),targetHeight:i.height,targetWidth:i.width,initialX:t,initialY:r})},n.onMouseMove=function(e){e.cancelable&&e.preventDefault(),n.onMove(e.clientX,e.clientY)},n.onTouchMove=function(e){e.cancelable&&e.preventDefault(),n.onMove(e.touches[0].clientX,e.touches[0].clientY)},n.onWheel=function(e){n.state.itemDragged<0||(n.lastScroll=n.listRef.current.scrollTop+=e.deltaY,n.moveOtherItems())},n.onMove=function(e,t){if(-1===n.state.itemDragged)return null;c.transformItem(n.ghostRef.current,t-n.state.initialY,n.props.lockVertically?0:e-n.state.initialX),n.autoScrolling(t),n.moveOtherItems()},n.moveOtherItems=function(){var e=n.ghostRef.current.getBoundingClientRect(),t=e.top+e.height/2,r=c.getTranslateOffset(n.getChildren()[n.state.itemDragged]),o=n.getYOffset();n.initialYOffset!==o&&(n.topOffsets=n.topOffsets.map((function(e){return e-(o-n.initialYOffset)})),n.initialYOffset=o),n.isDraggedItemOutOfBounds()&&n.props.removableByMove?n.afterIndex=n.topOffsets.length+1:n.afterIndex=c.binarySearch(n.topOffsets,t),n.animateItems(-1===n.afterIndex?0:n.afterIndex,n.state.itemDragged,r)},n.autoScrolling=function(e){var t=n.listRef.current.getBoundingClientRect(),r=t.top,o=t.bottom,i=t.height,s=window.innerHeight||document.documentElement.clientHeight;if(o>s&&s-e<u)n.setState({scrollingSpeed:Math.round((u-(s-e))/10),scrollWindow:!0});else if(r<0&&e<u)n.setState({scrollingSpeed:Math.round((u-e)/-10),scrollWindow:!0});else if(n.state.scrollWindow&&0!==n.state.scrollingSpeed&&n.setState({scrollingSpeed:0,scrollWindow:!1}),i+20<n.listRef.current.scrollHeight){var a=0;e-r<u?a=Math.round((u-(e-r))/-10):o-e<u&&(a=Math.round((u-(o-e))/10)),n.state.scrollingSpeed!==a&&n.setState({scrollingSpeed:a})}},n.animateItems=function(e,t,r,o){void 0===o&&(o=!1),n.getChildren().forEach((function(i,s){if(c.setItemTransition(i,n.props.transitionDuration),t===s&&o){if(t===e)return c.transformItem(i,null);c.transformItem(i,t<e?n.itemTranslateOffsets.slice(t+1,e+1).reduce((function(e,t){return e+t}),0):-1*n.itemTranslateOffsets.slice(e,t).reduce((function(e,t){return e+t}),0))}else t<e&&s>t&&s<=e?c.transformItem(i,-r):s<t&&t>e&&s>=e?c.transformItem(i,r):c.transformItem(i,null)}))},n.isDraggedItemOutOfBounds=function(){var e=n.getChildren()[n.state.itemDragged].getBoundingClientRect(),t=n.ghostRef.current.getBoundingClientRect();return Math.abs(e.left-t.left)>t.width?(-1===n.state.itemDraggedOutOfBounds&&n.setState({itemDraggedOutOfBounds:n.state.itemDragged}),!0):(n.state.itemDraggedOutOfBounds>-1&&n.setState({itemDraggedOutOfBounds:-1}),!1)},n.onEnd=function(e){e.cancelable&&e.preventDefault(),document.removeEventListener("mousemove",n.schdOnMouseMove),document.removeEventListener("touchmove",n.schdOnTouchMove),document.removeEventListener("mouseup",n.schdOnEnd),document.removeEventListener("touchup",n.schdOnEnd),document.removeEventListener("touchcancel",n.schdOnEnd);var t=n.props.removableByMove&&n.isDraggedItemOutOfBounds();!t&&n.props.transitionDuration>0&&-2!==n.afterIndex&&c.schd((function(){c.setItemTransition(n.ghostRef.current,n.props.transitionDuration,"cubic-bezier(.2,1,.1,1)"),n.afterIndex<1&&0===n.state.itemDragged?c.transformItem(n.ghostRef.current,0,0):c.transformItem(n.ghostRef.current,-(window.pageYOffset-n.lastYOffset)-(n.listRef.current.scrollTop-n.lastListYOffset)+(n.state.itemDragged<n.afterIndex?n.itemTranslateOffsets.slice(n.state.itemDragged+1,n.afterIndex+1).reduce((function(e,t){return e+t}),0):-1*n.itemTranslateOffsets.slice(n.afterIndex<0?0:n.afterIndex,n.state.itemDragged).reduce((function(e,t){return e+t}),0)),0)}))(),n.dropTimeout=window.setTimeout(n.finishDrop,t||-2===n.afterIndex?0:n.props.transitionDuration)},n.finishDrop=function(){var e=n.props.removableByMove&&n.isDraggedItemOutOfBounds();(e||n.afterIndex>-2&&n.state.itemDragged!==n.afterIndex)&&n.props.onChange({oldIndex:n.state.itemDragged,newIndex:e?-1:Math.max(n.afterIndex,0),targetRect:n.ghostRef.current.getBoundingClientRect()}),n.getChildren().forEach((function(e){c.setItemTransition(e,0),c.transformItem(e,null)})),n.setState({itemDragged:-1,scrollingSpeed:0}),n.afterIndex=-2,n.lastScroll>0&&(n.listRef.current.scrollTop=n.lastScroll,n.lastScroll=0)},n.onKeyDown=function(e){var t=n.state.selectedItem,r=n.getTargetIndex(e);if(!c.checkIfInteractive(e.target,e.currentTarget)&&-1!==r){if(" "===e.key&&(e.preventDefault(),t===r?(t!==n.needle&&(n.getChildren().forEach((function(e){c.setItemTransition(e,0),c.transformItem(e,null)})),n.props.onChange({oldIndex:t,newIndex:n.needle,targetRect:n.getChildren()[n.needle].getBoundingClientRect()}),n.getChildren()[n.needle].focus()),n.setState({selectedItem:-1,liveText:n.props.voiceover.dropped(t+1,n.needle+1)}),n.needle=-1):(n.setState({selectedItem:r,liveText:n.props.voiceover.lifted(r+1)}),n.needle=r,n.calculateOffsets())),("ArrowDown"===e.key||"j"===e.key)&&t>-1&&n.needle<n.props.values.length-1){e.preventDefault();var o=c.getTranslateOffset(n.getChildren()[t]);n.needle++,n.animateItems(n.needle,t,o,!0),n.setState({liveText:n.props.voiceover.moved(n.needle+1,!1)})}("ArrowUp"===e.key||"k"===e.key)&&t>-1&&n.needle>0&&(e.preventDefault(),o=c.getTranslateOffset(n.getChildren()[t]),n.needle--,n.animateItems(n.needle,t,o,!0),n.setState({liveText:n.props.voiceover.moved(n.needle+1,!0)})),"Escape"===e.key&&t>-1&&(n.getChildren().forEach((function(e){c.setItemTransition(e,0),c.transformItem(e,null)})),n.setState({selectedItem:-1,liveText:n.props.voiceover.canceled(t+1)}),n.needle=-1),("Tab"===e.key||"Enter"===e.key)&&t>-1&&e.preventDefault()}},n.schdOnMouseMove=c.schd(n.onMouseMove),n.schdOnTouchMove=c.schd(n.onTouchMove),n.schdOnEnd=c.schd(n.onEnd),n}return o(t,e),t.prototype.componentDidMount=function(){this.calculateOffsets(),document.addEventListener("touchstart",this.onMouseOrTouchStart,{passive:!1,capture:!1}),document.addEventListener("mousedown",this.onMouseOrTouchStart)},t.prototype.componentDidUpdate=function(e,t){t.scrollingSpeed!==this.state.scrollingSpeed&&0===t.scrollingSpeed&&this.doScrolling()},t.prototype.componentWillUnmount=function(){document.removeEventListener("touchstart",this.onMouseOrTouchStart),document.removeEventListener("mousedown",this.onMouseOrTouchStart)},t.prototype.render=function(){var e=this,t=i(i({},this.props.useDragHandle?void 0:{userSelect:"none",WebkitUserSelect:"none",MozUserSelect:"none",msUserSelect:"none"}),{boxSizing:"border-box",position:"relative"}),n=i(i({},t),{top:this.state.targetY,left:this.state.targetX,width:this.state.targetWidth,height:this.state.targetHeight,position:"fixed",marginTop:0});return a.createElement(a.Fragment,null,this.props.renderList({children:this.props.values.map((function(n,r){var o=r===e.state.itemDragged,s=r===e.state.selectedItem,a={key:r,tabIndex:e.props.values[r]&&e.props.values[r].disabled?-1:0,"aria-roledescription":e.props.voiceover.item(r+1),onKeyDown:e.onKeyDown,style:i(i({},t),{visibility:o?"hidden":void 0,zIndex:s?5e3:0})};return e.props.renderItem({value:n,props:a,index:r,isDragged:!1,isSelected:s,isOutOfBounds:!1})})),isDragged:this.state.itemDragged>-1,props:{ref:this.listRef}}),this.state.itemDragged>-1&&l.createPortal(this.props.renderItem({value:this.props.values[this.state.itemDragged],props:{ref:this.ghostRef,style:n,onWheel:this.onWheel},index:this.state.itemDragged,isDragged:!0,isSelected:!1,isOutOfBounds:this.state.itemDraggedOutOfBounds>-1}),this.props.container||document.body),a.createElement("div",{"aria-live":"assertive",role:"log","aria-atomic":"true",style:{position:"absolute",width:"1px",height:"1px",margin:"-1px",border:"0px",padding:"0px",overflow:"hidden",clip:"rect(0px, 0px, 0px, 0px)",clipPath:"inset(100%)"}},this.state.liveText))},t.defaultProps={transitionDuration:300,lockVertically:!1,removableByMove:!1,voiceover:{item:function(e){return"You are currently at a draggable item at position "+e+". Press space bar to lift."},lifted:function(e){return"You have lifted item at position "+e+". Press j to move down, k to move up, space bar to drop and escape to cancel."},moved:function(e,t){return"You have moved the lifted item "+(t?"up":"down")+" to position "+e+". Press j to move down, k to move up, space bar to drop and escape to cancel."},dropped:function(e,t){return"You have dropped the item. It has moved from position "+e+" to "+t+"."},canceled:function(e){return"You have cancelled the movement. The item has returned to its starting position of "+e+"."}}},t}(a.Component);t.default=d},56695:function(e,t,n){var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var o=r(n(92526));t.List=o.default;var i=n(32871);t.arrayMove=i.arrayMove,t.arrayRemove=i.arrayRemove},32871:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.arrayMove=function(e,t,n){return(e=e.slice()).splice(n<0?e.length+n:n,0,e.splice(t,1)[0]),e},t.arrayRemove=function(e,t){return(e=e.slice()).splice(t,1),e},t.getTranslateOffset=function(e){var t=window.getComputedStyle(e);return Math.max(parseInt(t["margin-top"],10),parseInt(t["margin-bottom"],10))+e.getBoundingClientRect().height},t.isTouchEvent=function(e){return e.touches&&e.touches.length||e.changedTouches&&e.changedTouches.length},t.transformItem=function(e,t,n){void 0===t&&(t=0),void 0===n&&(n=0),e&&(null!==t&&null!==n?e.style.transform="translate("+n+"px, "+t+"px)":e.style.removeProperty("transform"))},t.isItemTransformed=function(e){return!!e.style.transform},t.setItemTransition=function(e,t,n){e&&(e.style.transition="transform "+t+"ms"+(n?" "+n:""))},t.binarySearch=function(e,t){for(var n,r=0,o=e.length-1;r<=o;){if(!e[(n=Math.floor((o+r)/2))+1]||e[n]<=t&&e[n+1]>=t)return n;e[n]<t&&e[n+1]<t?r=n+1:o=n-1}return-1},t.schd=function(e){var t=[],n=null;return function(){for(var r=[],o=0;o<arguments.length;o++)r[o]=arguments[o];t=r,n||(n=requestAnimationFrame((function(){n=null,e.apply(void 0,t)})))}},t.checkIfInteractive=function(e,t){for(var n=["input","textarea","select","option","optgroup","video","audio","button","a"],r=["button","link","checkbox","tab"];e!==t;){if(e.getAttribute("data-movable-handle"))return!1;if(n.includes(e.tagName.toLowerCase()))return!0;var o=e.getAttribute("role");if(o&&r.includes(o.toLowerCase()))return!0;if("label"===e.tagName.toLowerCase()&&e.hasAttribute("for"))return!0;e.tagName&&(e=e.parentElement)}return!1}}}]);