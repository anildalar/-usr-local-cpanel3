//~~GENERATED~~
//-------------------------------------------------------------
// Source:    /usr/local/cpanel/base/sharedjs/transfers/TransferSession.js
// Generated: /usr/local/cpanel/base/sharedjs/transfers/TransferSession-th.js
// Module:    legacy_shared/transfers/TransferSession-th
// Locale:    th
// This file is generated by the cpanel localization system
// using the bin/_build_translated_js_hash_files.pl script.
//-------------------------------------------------------------
// !!! Do not hand edit this file !!!
//-------------------------------------------------------------
(function() {
    // The raw lexicon.
    var newLex = {"Abort Session Processing":"ยกเลิกการประมวลผลเซสชัน","Are you sure you want to abort this transfer?":"คุณแน่ใจหรือไม่ว่าต้องการยกเลิกการถ่ายโอนนี้","Are you sure you want to pause this transfer?":"คุณแน่ใจหรือไม่ว่าต้องการพักการถ่ายโอนนี้","Failed to abort the session.":"ไม่สามารถยกเลิกการทำงานของเซสชัน","Failed to pause the session.":"ไม่สามารถพักการทำงานของเซสชัน","Failed to start transfer.":"ไม่สามารถเริ่มการถ่ายโอนได้","Pausing queue processing …":"กำลังพักการประมวลผลคิว …","The system will abort any transfer processes as soon as possible. In order to prevent data loss, the system will complete ongoing restore operations before the entire session aborts.":"ระบบจะยกเลิกการทำงานของกระบวนการถ่ายโอนโดยเร็วที่สุด เพื่อป้องกันข้อมูลสูญหาย ระบบจะทำการคืนค่าที่ดำเนินการอยู่ให้เสร็จสมบูรณ์ก่อนที่ทั้งเซสชันจะหยุดการทำงาน","The system will not add new items to the queue until you choose to resume. In order to prevent data loss, the system will complete ongoing operations.":"ระบบจะไม่เพิ่มรายการใหม่ลงในคิวจนกว่าคุณจะเลือกให้ทำต่อ เพื่อป้องกันข้อมูลสูญหาย ระบบจะทำการดำเนินการที่ดำเนินอยู่ให้เสร็จสมบูรณ์","There is no handler for [asis,sessionState]: [_1]":"ไม่มีตัวจัดการสำหรับ [asis,sessionState]: [_1]"};

    if (!this.LEXICON) {
        this.LEXICON = {};
    }

    for(var item in newLex) {
        if(newLex.hasOwnProperty(item)) {
            var value = newLex[item];
            if (typeof(value) === "string" && value !== "") {
                // Only add it if there is a value.
                this.LEXICON[item] = value;
            }
        }
    }
})();
//~~END-GENERATED~~
