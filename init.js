/*
 * Copyright (c) Codiad & Andr3as, distributed
 * as-is and without warranty under the MIT License.
 * See http://opensource.org/licenses/MIT for more information. 
 * This information must remain intact.
 */

(function(global, $){
    
    var codiad = global.codiad,
        scripts = document.getElementsByTagName('script'),
        path = scripts[scripts.length-1].src.split('?')[0],
        curpath = path.split('/').slice(0, -1).join('/')+'/';

    $(function() {
        codiad.Duplicate.init();
    });

    codiad.Duplicate = {
        
        path: curpath,
        
        init: function() {
            
        },
        
        duplicate: function(path) {
            //codiad.filemanager.contextMenuHide();
            var _this = this;
            setTimeout(function(){
                var name = prompt("Duplicate name:", _this.getName(path));
                if (name === null) {
                    return false;
                }
                $.getJSON(_this.path+"controller.php?action=duplicate&path="+path+"&name="+name, function(json){
                    codiad.message[json.status](json.message);
                    codiad.filemanager.rescan(codiad.project.getCurrent());
                });
            }, 250);
        },
        
        getName: function(path) {
            return path.substring(path.lastIndexOf("/")+1);
        }
    };
})(this, jQuery);