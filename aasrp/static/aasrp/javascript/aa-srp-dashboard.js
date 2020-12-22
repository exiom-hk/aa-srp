/* global aaSrpSettings, moment */

$(document).ready(function() {
    'use strict';

    var totalSrpAmount = 0;
    var userSrpAmount = 0;

    /**
     * Table :: SRP Links
     */
    $('#tab_aasrp_srp_links').DataTable({
        ajax: {
            url: aaSrpSettings.url.availableSrpLinks,
            dataSrc: '',
            cache: false
        },
        columns: [
            {
                data: 'srp_name',
                className: 'srp-link-fleet-name'
            },
            {
                data: 'creator',
                className: 'srp-link-creator'
            },
            {
                data: 'fleet_time',
                render: $.fn.dataTable.render.moment(
                    moment.ISO_8601,
                    aaSrpSettings.datetimeFormat
                ),
                className: 'srp-link-fleet-time'
            },
            {
                data: 'fleet_commander',
                className: 'srp-link-fleet-commander'
            },
            {
                data: 'fleet_doctrine',
                className: 'srp-link-fleet-doctrine'
            },
            {
                data: 'aar_link',
                className: 'srp-link-aar-link'
            },
            {
                data: 'srp_code',
                className: 'srp-link-code'
            },
            {
                data: 'srp_costs',
                render: function(data, type, row, meta) {
                    if(type === 'display') {
                        return data.toLocaleString() + ' ISK';
                    } else {
                        return data;
                    }
                },
                className: 'srp-link-total-cost text-right'
            },
            {
                data: 'srp_status',
                className: 'srp-link-status'
            },
            {
                data: 'pending_requests',
                className: 'srp-link-pending-requests'
            },
            {
                data: 'actions',
                className: 'srp-link-actions'
            }
        ],
        columnDefs: [
            {
                orderable: false,
                targets: [10]
            },
            {
                width: 115,
                targets: [10]
            }
        ],
        order: [[2, 'asc']],
        paging: false,
        /**
         * when ever a row is created ...
         *
         * @param row
         * @param data
         * @param rowIndex
         */
        createdRow: function(row, data, rowIndex) {
            // Row id attr
            $(row).attr('data-row-id', rowIndex);
            $(row).attr('data-srp-request-code', data.srp_code);

            totalSrpAmount += parseInt(data.srp_costs);
            $('.srp-dashboard-total-isk-cost-amount').html(totalSrpAmount.toLocaleString() + ' ISK');
        },
    });

    /**
     * Table :: User's own SRP requests
     */
    $('#tab_aasrp_user_srp_requests').DataTable({
        ajax: {
            url: aaSrpSettings.url.userSrpRequests,
            dataSrc: '',
            cache: false
        },
        columns: [
            {
                data: 'request_time',
                render: $.fn.dataTable.render.moment(
                    moment.ISO_8601,
                    aaSrpSettings.datetimeFormat
                ),
                className: 'srp-request-time'
            },
            {
                data: 'character',
                className: 'srp-request-character'
            },
            {
                data: 'fleet_name',
                className: 'srp-request-fleet-name'
            },
            {
                data: 'srp_code',
                className: 'srp-request-srp-code'
            },
            {
                data: 'request_code',
                className: 'srp-request-code'
            },
            {
                data: 'ship_html',
                render: {
                    display: 'display',
                    _: 'sort'
                },
                className: 'srp-request-ship'
            },
            // {data: 'zkb_link'},
            {
                data: 'zbk_loss_amount',
                render: function(data, type, row, meta) {
                    if(type === 'display') {
                        return data.toLocaleString() + ' ISK';
                    } else {
                        return data;
                    }
                },
                className: 'srp-request-zkb-loss-amount text-right'
            },
            {
                data: 'payout_amount',
                render: function(data, type, row, meta) {
                    if(type === 'display') {
                        return data.toLocaleString() + ' ISK';
                    } else {
                        return data;
                    }
                },
                className: 'srp-request-payout text-right'
            },
            {
                data: 'request_status_icon',
                className: 'srp-request-status text-center'
            },
            // hidden columns
            {data: 'request_status'},
            {data: 'ship'},
        ],
        columnDefs: [
            {
                orderable: false,
                targets: [8]
            },
            {
                visible: false,
                targets: [9, 10]
            }
        ],
        order: [[0, 'desc']],
        filterDropDown: {
            columns: [
                {
                    idx: 1,
                },
                {
                    idx: 10,
                    title: aaSrpSettings.translation.filterRequestShip
                },
                {
                    idx: 9,
                    title: aaSrpSettings.translation.filterRequestStatus
                }
            ],
            autoSize: false,
            bootstrap: true
        },
        /**
         * when ever a row is created ...
         *
         * @param row
         * @param data
         * @param rowIndex
         */
        createdRow: function(row, data, rowIndex) {
            // Row id attr
            $(row).attr('data-row-id', rowIndex);
            $(row).attr('data-srp-request-code', data.request_code);

            userSrpAmount += parseInt(data.payout_amount);
            $('.srp-dashboard-user-isk-cost-amount').html(userSrpAmount.toLocaleString() + ' ISK');
        },
    });
});
