goog.provide('byoubu.spec');
/**
 * Every backdrop names the same nine roles. A fixed vocabulary is what lets
 *   `byoubu.plate` build a plate for any entry without special-casing, and
 *   what lets two backdrops be compared.
 */
byoubu.spec.required_palette_keys = new cljs.core.PersistentVector(null, 9, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sky-zenith","sky-zenith",-20065151),new cljs.core.Keyword(null,"sky-mid","sky-mid",106630624),new cljs.core.Keyword(null,"sky-horizon","sky-horizon",-157541617),new cljs.core.Keyword(null,"haze","haze",-1024870708),new cljs.core.Keyword(null,"ridge-far","ridge-far",762525090),new cljs.core.Keyword(null,"ridge-near","ridge-near",1102584738),new cljs.core.Keyword(null,"dune-lit","dune-lit",790638115),new cljs.core.Keyword(null,"dune-shadow","dune-shadow",423450330),new cljs.core.Keyword(null,"star","star",279424429)], null);
byoubu.spec.required_scene_keys = new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sky","sky",1271496862),new cljs.core.Keyword(null,"atmosphere","atmosphere",523254734),new cljs.core.Keyword(null,"terrain","terrain",704966005),new cljs.core.Keyword(null,"camera","camera",-1190348585),new cljs.core.Keyword(null,"grade","grade",2117054771)], null);
byoubu.spec.textures = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"moderate","moderate",-1039163165),null,new cljs.core.Keyword(null,"calm","calm",-533989756),null,new cljs.core.Keyword(null,"busy","busy",-328286801),null], null), null);
byoubu.spec.missing = (function byoubu$spec$missing(m,ks){
return cljs.core.remove.cljs$core$IFn$_invoke$arity$2((function (p1__22768_SHARP_){
return cljs.core.contains_QMARK_(m,p1__22768_SHARP_);
}),ks);
});
/**
 * Vector of problem descriptions for one backdrop; empty means valid.
 */
byoubu.spec.problems = (function byoubu$spec$problems(backdrop){
var id = new cljs.core.Keyword("byoubu","id","byoubu/id",459733156).cljs$core$IFn$_invoke$arity$1(backdrop);
var palette = new cljs.core.Keyword("byoubu","palette","byoubu/palette",851879321).cljs$core$IFn$_invoke$arity$1(backdrop);
var band = new cljs.core.Keyword("byoubu","content-band","byoubu/content-band",-1665630238).cljs$core$IFn$_invoke$arity$1(backdrop);
var scene = new cljs.core.Keyword("byoubu","scene","byoubu/scene",1831525071).cljs$core$IFn$_invoke$arity$1(backdrop);
var pfx = [cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([id], 0)),": "].join('');
return cljs.core.vec(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic((function (){var iter__5480__auto__ = (function byoubu$spec$problems_$_iter__22781(s__22782){
return (new cljs.core.LazySeq(null,(function (){
var s__22782__$1 = s__22782;
while(true){
var temp__5825__auto__ = cljs.core.seq(s__22782__$1);
if(temp__5825__auto__){
var s__22782__$2 = temp__5825__auto__;
if(cljs.core.chunked_seq_QMARK_(s__22782__$2)){
var c__5478__auto__ = cljs.core.chunk_first(s__22782__$2);
var size__5479__auto__ = cljs.core.count(c__5478__auto__);
var b__22784 = cljs.core.chunk_buffer(size__5479__auto__);
if((function (){var i__22783 = (0);
while(true){
if((i__22783 < size__5479__auto__)){
var k = cljs.core._nth(c__5478__auto__,i__22783);
if((cljs.core.get.cljs$core$IFn$_invoke$arity$2(backdrop,k) == null)){
cljs.core.chunk_append(b__22784,[pfx,"missing ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(k)].join(''));

var G__22930 = (i__22783 + (1));
i__22783 = G__22930;
continue;
} else {
var G__22931 = (i__22783 + (1));
i__22783 = G__22931;
continue;
}
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__22784),byoubu$spec$problems_$_iter__22781(cljs.core.chunk_rest(s__22782__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__22784),null);
}
} else {
var k = cljs.core.first(s__22782__$2);
if((cljs.core.get.cljs$core$IFn$_invoke$arity$2(backdrop,k) == null)){
return cljs.core.cons([pfx,"missing ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(k)].join(''),byoubu$spec$problems_$_iter__22781(cljs.core.rest(s__22782__$2)));
} else {
var G__22932 = cljs.core.rest(s__22782__$2);
s__22782__$1 = G__22932;
continue;
}
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__5480__auto__(new cljs.core.PersistentVector(null, 10, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("byoubu","id","byoubu/id",459733156),new cljs.core.Keyword("byoubu","title","byoubu/title",1943539519),new cljs.core.Keyword("byoubu","summary","byoubu/summary",1753941440),new cljs.core.Keyword("byoubu","tags","byoubu/tags",-743870735),new cljs.core.Keyword("byoubu","seed","byoubu/seed",841916191),new cljs.core.Keyword("byoubu","texture","byoubu/texture",1576630445),new cljs.core.Keyword("byoubu","accent","byoubu/accent",553460268),new cljs.core.Keyword("byoubu","palette","byoubu/palette",851879321),new cljs.core.Keyword("byoubu","content-band","byoubu/content-band",-1665630238),new cljs.core.Keyword("byoubu","scene","byoubu/scene",1831525071)], null));
})(),(((id instanceof cljs.core.Keyword))?null:new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [[pfx,"id must be a keyword"].join('')], null)),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([((cljs.core.int_QMARK_(new cljs.core.Keyword("byoubu","seed","byoubu/seed",841916191).cljs$core$IFn$_invoke$arity$1(backdrop)))?null:new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [[pfx,"seed must be an integer \u2014 a backdrop nobody can re-render ","is an asset, not a spec"].join('')], null)),((cljs.core.contains_QMARK_(byoubu.spec.textures,new cljs.core.Keyword("byoubu","texture","byoubu/texture",1576630445).cljs$core$IFn$_invoke$arity$1(backdrop)))?null:new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [[pfx,"texture must be one of ",clojure.string.join.cljs$core$IFn$_invoke$arity$2("/",cljs.core.sort.cljs$core$IFn$_invoke$arity$1(byoubu.spec.textures))].join('')], null)),(function (){var iter__5480__auto__ = (function byoubu$spec$problems_$_iter__22785(s__22786){
return (new cljs.core.LazySeq(null,(function (){
var s__22786__$1 = s__22786;
while(true){
var temp__5825__auto__ = cljs.core.seq(s__22786__$1);
if(temp__5825__auto__){
var s__22786__$2 = temp__5825__auto__;
if(cljs.core.chunked_seq_QMARK_(s__22786__$2)){
var c__5478__auto__ = cljs.core.chunk_first(s__22786__$2);
var size__5479__auto__ = cljs.core.count(c__5478__auto__);
var b__22788 = cljs.core.chunk_buffer(size__5479__auto__);
if((function (){var i__22787 = (0);
while(true){
if((i__22787 < size__5479__auto__)){
var k = cljs.core._nth(c__5478__auto__,i__22787);
cljs.core.chunk_append(b__22788,[pfx,"palette missing ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(k)].join(''));

var G__22969 = (i__22787 + (1));
i__22787 = G__22969;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__22788),byoubu$spec$problems_$_iter__22785(cljs.core.chunk_rest(s__22786__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__22788),null);
}
} else {
var k = cljs.core.first(s__22786__$2);
return cljs.core.cons([pfx,"palette missing ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(k)].join(''),byoubu$spec$problems_$_iter__22785(cljs.core.rest(s__22786__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__5480__auto__(byoubu.spec.missing(palette,byoubu.spec.required_palette_keys));
})(),(function (){var iter__5480__auto__ = (function byoubu$spec$problems_$_iter__22796(s__22797){
return (new cljs.core.LazySeq(null,(function (){
var s__22797__$1 = s__22797;
while(true){
var temp__5825__auto__ = cljs.core.seq(s__22797__$1);
if(temp__5825__auto__){
var s__22797__$2 = temp__5825__auto__;
if(cljs.core.chunked_seq_QMARK_(s__22797__$2)){
var c__5478__auto__ = cljs.core.chunk_first(s__22797__$2);
var size__5479__auto__ = cljs.core.count(c__5478__auto__);
var b__22799 = cljs.core.chunk_buffer(size__5479__auto__);
if((function (){var i__22798 = (0);
while(true){
if((i__22798 < size__5479__auto__)){
var vec__22801 = cljs.core._nth(c__5478__auto__,i__22798);
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__22801,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__22801,(1),null);
if((byoubu.color.hex__GT_rgb(v) == null)){
cljs.core.chunk_append(b__22799,[pfx,"palette ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(k)," is not a hex color: ",cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([v], 0))].join(''));

var G__22973 = (i__22798 + (1));
i__22798 = G__22973;
continue;
} else {
var G__22977 = (i__22798 + (1));
i__22798 = G__22977;
continue;
}
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__22799),byoubu$spec$problems_$_iter__22796(cljs.core.chunk_rest(s__22797__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__22799),null);
}
} else {
var vec__22804 = cljs.core.first(s__22797__$2);
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__22804,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__22804,(1),null);
if((byoubu.color.hex__GT_rgb(v) == null)){
return cljs.core.cons([pfx,"palette ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(k)," is not a hex color: ",cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([v], 0))].join(''),byoubu$spec$problems_$_iter__22796(cljs.core.rest(s__22797__$2)));
} else {
var G__22982 = cljs.core.rest(s__22797__$2);
s__22797__$1 = G__22982;
continue;
}
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__5480__auto__(palette);
})(),((cljs.core.contains_QMARK_(palette,new cljs.core.Keyword("byoubu","accent","byoubu/accent",553460268).cljs$core$IFn$_invoke$arity$1(backdrop)))?null:new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [[pfx,"accent ",cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword("byoubu","accent","byoubu/accent",553460268).cljs$core$IFn$_invoke$arity$1(backdrop)], 0))," is not a palette key"].join('')], null)),(function (){var iter__5480__auto__ = (function byoubu$spec$problems_$_iter__22809(s__22810){
return (new cljs.core.LazySeq(null,(function (){
var s__22810__$1 = s__22810;
while(true){
var temp__5825__auto__ = cljs.core.seq(s__22810__$1);
if(temp__5825__auto__){
var s__22810__$2 = temp__5825__auto__;
if(cljs.core.chunked_seq_QMARK_(s__22810__$2)){
var c__5478__auto__ = cljs.core.chunk_first(s__22810__$2);
var size__5479__auto__ = cljs.core.count(c__5478__auto__);
var b__22812 = cljs.core.chunk_buffer(size__5479__auto__);
if((function (){var i__22811 = (0);
while(true){
if((i__22811 < size__5479__auto__)){
var vec__22815 = cljs.core._nth(c__5478__auto__,i__22811);
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__22815,(0),null);
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__22815,(1),null);
if((!(cljs.core.contains_QMARK_(palette,k)))){
cljs.core.chunk_append(b__22812,[pfx,"content-band references unknown palette key ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(k)].join(''));

var G__23075 = (i__22811 + (1));
i__22811 = G__23075;
continue;
} else {
var G__23077 = (i__22811 + (1));
i__22811 = G__23077;
continue;
}
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__22812),byoubu$spec$problems_$_iter__22809(cljs.core.chunk_rest(s__22810__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__22812),null);
}
} else {
var vec__22820 = cljs.core.first(s__22810__$2);
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__22820,(0),null);
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__22820,(1),null);
if((!(cljs.core.contains_QMARK_(palette,k)))){
return cljs.core.cons([pfx,"content-band references unknown palette key ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(k)].join(''),byoubu$spec$problems_$_iter__22809(cljs.core.rest(s__22810__$2)));
} else {
var G__23079 = cljs.core.rest(s__22810__$2);
s__22810__$1 = G__23079;
continue;
}
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__5480__auto__(band);
})(),(function (){var total = cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(cljs.core._PLUS_,0.0,cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.second,band));
var drift = (total - 1.0);
var drift__$1 = (((drift < (0)))?(- drift):drift);
if((drift__$1 > 0.001)){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [[pfx,"content-band weights sum to ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(total),", not 1.0"].join('')], null);
} else {
return null;
}
})(),(function (){var iter__5480__auto__ = (function byoubu$spec$problems_$_iter__22832(s__22833){
return (new cljs.core.LazySeq(null,(function (){
var s__22833__$1 = s__22833;
while(true){
var temp__5825__auto__ = cljs.core.seq(s__22833__$1);
if(temp__5825__auto__){
var s__22833__$2 = temp__5825__auto__;
if(cljs.core.chunked_seq_QMARK_(s__22833__$2)){
var c__5478__auto__ = cljs.core.chunk_first(s__22833__$2);
var size__5479__auto__ = cljs.core.count(c__5478__auto__);
var b__22835 = cljs.core.chunk_buffer(size__5479__auto__);
if((function (){var i__22834 = (0);
while(true){
if((i__22834 < size__5479__auto__)){
var k = cljs.core._nth(c__5478__auto__,i__22834);
cljs.core.chunk_append(b__22835,[pfx,"scene missing ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(k)].join(''));

var G__23096 = (i__22834 + (1));
i__22834 = G__23096;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__22835),byoubu$spec$problems_$_iter__22832(cljs.core.chunk_rest(s__22833__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__22835),null);
}
} else {
var k = cljs.core.first(s__22833__$2);
return cljs.core.cons([pfx,"scene missing ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(k)].join(''),byoubu$spec$problems_$_iter__22832(cljs.core.rest(s__22833__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__5480__auto__(byoubu.spec.missing(scene,byoubu.spec.required_scene_keys));
})(),(function (){var iter__5480__auto__ = (function byoubu$spec$problems_$_iter__22838(s__22839){
return (new cljs.core.LazySeq(null,(function (){
var s__22839__$1 = s__22839;
while(true){
var temp__5825__auto__ = cljs.core.seq(s__22839__$1);
if(temp__5825__auto__){
var s__22839__$2 = temp__5825__auto__;
if(cljs.core.chunked_seq_QMARK_(s__22839__$2)){
var c__5478__auto__ = cljs.core.chunk_first(s__22839__$2);
var size__5479__auto__ = cljs.core.count(c__5478__auto__);
var b__22841 = cljs.core.chunk_buffer(size__5479__auto__);
if((function (){var i__22840 = (0);
while(true){
if((i__22840 < size__5479__auto__)){
var vec__22844 = cljs.core._nth(c__5478__auto__,i__22840);
var tier = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__22844,(0),null);
var m = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__22844,(1),null);
if((byoubu.color.hex__GT_rgb(new cljs.core.Keyword(null,"content-color","content-color",1294205929).cljs$core$IFn$_invoke$arity$1(m)) == null)){
cljs.core.chunk_append(b__22841,[pfx,"measured ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(tier)," content-color is not a hex color: ",cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"content-color","content-color",1294205929).cljs$core$IFn$_invoke$arity$1(m)], 0))].join(''));

var G__23107 = (i__22840 + (1));
i__22840 = G__23107;
continue;
} else {
var G__23117 = (i__22840 + (1));
i__22840 = G__23117;
continue;
}
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__22841),byoubu$spec$problems_$_iter__22838(cljs.core.chunk_rest(s__22839__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__22841),null);
}
} else {
var vec__22849 = cljs.core.first(s__22839__$2);
var tier = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__22849,(0),null);
var m = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__22849,(1),null);
if((byoubu.color.hex__GT_rgb(new cljs.core.Keyword(null,"content-color","content-color",1294205929).cljs$core$IFn$_invoke$arity$1(m)) == null)){
return cljs.core.cons([pfx,"measured ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(tier)," content-color is not a hex color: ",cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"content-color","content-color",1294205929).cljs$core$IFn$_invoke$arity$1(m)], 0))].join(''),byoubu$spec$problems_$_iter__22838(cljs.core.rest(s__22839__$2)));
} else {
var G__23132 = cljs.core.rest(s__22839__$2);
s__22839__$1 = G__23132;
continue;
}
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__5480__auto__(cljs.core.select_keys(new cljs.core.Keyword("byoubu","measured","byoubu/measured",-610808208).cljs$core$IFn$_invoke$arity$1(backdrop),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"plate","plate",-1920178141),new cljs.core.Keyword(null,"poster","poster",-1616913550)], null)));
})(),(function (){var f = byoubu.facts.derive_facts(backdrop);
var ink = new cljs.core.Keyword("byoubu.facts","ink","byoubu.facts/ink",567836213).cljs$core$IFn$_invoke$arity$1(f);
var iter__5480__auto__ = (function byoubu$spec$problems_$_iter__22855(s__22856){
return (new cljs.core.LazySeq(null,(function (){
var s__22856__$1 = s__22856;
while(true){
var temp__5825__auto__ = cljs.core.seq(s__22856__$1);
if(temp__5825__auto__){
var s__22856__$2 = temp__5825__auto__;
if(cljs.core.chunked_seq_QMARK_(s__22856__$2)){
var c__5478__auto__ = cljs.core.chunk_first(s__22856__$2);
var size__5479__auto__ = cljs.core.count(c__5478__auto__);
var b__22858 = cljs.core.chunk_buffer(size__5479__auto__);
if((function (){var i__22857 = (0);
while(true){
if((i__22857 < size__5479__auto__)){
var vec__22886 = cljs.core._nth(c__5478__auto__,i__22857);
var tier = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__22886,(0),null);
var c = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__22886,(1),null);
var r = byoubu.color.contrast_ratio(ink,c);
if(((function (){var or__5002__auto__ = r;
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return 0.0;
}
})() < byoubu.facts.wcag_aa_body)){
cljs.core.chunk_append(b__22858,[pfx,"recommended ink ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(ink)," on the ",cljs.core.name(tier)," content band ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(c)," has contrast ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(r),", below AA body ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(byoubu.facts.wcag_aa_body)].join(''));

var G__23174 = (i__22857 + (1));
i__22857 = G__23174;
continue;
} else {
var G__23175 = (i__22857 + (1));
i__22857 = G__23175;
continue;
}
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__22858),byoubu$spec$problems_$_iter__22855(cljs.core.chunk_rest(s__22856__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__22858),null);
}
} else {
var vec__22913 = cljs.core.first(s__22856__$2);
var tier = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__22913,(0),null);
var c = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__22913,(1),null);
var r = byoubu.color.contrast_ratio(ink,c);
if(((function (){var or__5002__auto__ = r;
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return 0.0;
}
})() < byoubu.facts.wcag_aa_body)){
return cljs.core.cons([pfx,"recommended ink ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(ink)," on the ",cljs.core.name(tier)," content band ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(c)," has contrast ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(r),", below AA body ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(byoubu.facts.wcag_aa_body)].join(''),byoubu$spec$problems_$_iter__22855(cljs.core.rest(s__22856__$2)));
} else {
var G__23177 = cljs.core.rest(s__22856__$2);
s__22856__$1 = G__23177;
continue;
}
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__5480__auto__(byoubu.facts.tier_colors(backdrop));
})()], 0)));
});
byoubu.spec.valid_QMARK_ = (function byoubu$spec$valid_QMARK_(backdrop){
return cljs.core.empty_QMARK_(byoubu.spec.problems(backdrop));
});

//# sourceMappingURL=byoubu.spec.js.map
