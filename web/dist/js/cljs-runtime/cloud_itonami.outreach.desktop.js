goog.provide('cloud_itonami.outreach.desktop');
if((typeof cloud_itonami !== 'undefined') && (typeof cloud_itonami.outreach !== 'undefined') && (typeof cloud_itonami.outreach.desktop !== 'undefined') && (typeof cloud_itonami.outreach.desktop.root !== 'undefined')){
} else {
cloud_itonami.outreach.desktop.root = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(null);
}
cloud_itonami.outreach.desktop.mount_BANG_ = (function cloud_itonami$outreach$desktop$mount_BANG_(){
var el = document.getElementById("app");
if(cljs.core.truth_(cljs.core.deref(cloud_itonami.outreach.desktop.root))){
} else {
cljs.core.reset_BANG_(cloud_itonami.outreach.desktop.root,reagent.dom.client.create_root(el));
}

return reagent.dom.client.render.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(cloud_itonami.outreach.desktop.root),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cloud_itonami.outreach.ui.root], null));
});
cloud_itonami.outreach.desktop.init_BANG_ = (function cloud_itonami$outreach$desktop$init_BANG_(){
return cloud_itonami.outreach.desktop.mount_BANG_();
});

//# sourceMappingURL=cloud_itonami.outreach.desktop.js.map
