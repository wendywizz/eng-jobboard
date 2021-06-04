<?php

if (!defined('ABSPATH')) {
    die;
}

// main plugin class
class JobSearch_Indeed_Jobs_Scraping_Hooks {

    // hook things up
    public function __construct() {
        add_action('wp_ajax_jobsearch_import_scraping_indeed_jobs', array($this, 'jobsearch_import_indeed_jobs'));
        
        add_action('jobsearch_indeed_scraping_form_html', array($this, 'import_jobs_form'));
    }

    public function import_jobs_form() {
        global $jobsearch_form_fields;
        ?>
        <hr>
        <div id="wrapper" class="jobsearch-post-settings jobsearch-indeed-import-sec">
            <h2><?php esc_html_e('Import Indeed Jobs', 'wp-jobsearch'); ?></h2>
            <form id="jobsearch-import-indeed-jobs" class="jobsearch-indeed-jobs" method="post" enctype="multipart/form-data">
                <?php
                wp_nonce_field('jobsearch-import-indeed-jobs-page', '_wpnonce-jobsearch-import-indeed-jobs-page');
                ?>
                <div class="jobsearch-element-field">
                    <div class="elem-label">
                        <label><?php esc_html_e('Keywords', 'wp-jobsearch') ?></label>
                    </div>
                    <div class="elem-field">
                        <?php
                        $field_params = array(
                            'force_std' => '',
                            'id' => 'search_keywords',
                            'cus_name' => 'keyword',
                            'field_desc' => esc_html__('Enter job title, keywords or company name. The default keyword is all.', 'wp-jobsearch'),
                        );
                        $jobsearch_form_fields->input_field($field_params);
                        ?>
                    </div>
                </div>
                <div class="jobsearch-element-field">
                    <div class="elem-label">
                        <label><?php esc_html_e('Location', 'wp-jobsearch') ?></label>
                    </div>
                    <div class="elem-field">
                        <?php
                        $field_params = array(
                            'force_std' => '',
                            'id' => 'search_location',
                            'cus_name' => 'location',
                            'field_desc' => esc_html__('Enter a location for search.', 'wp-jobsearch'),
                        );
                        $jobsearch_form_fields->input_field($field_params);
                        ?>
                    </div>
                </div>
                <div class="jobsearch-element-field">
                    <div class="elem-label">
                        <label><?php esc_html_e('Type', 'wp-jobsearch') ?></label>
                    </div>
                    <div class="elem-field">
                        <?php
                        $field_params = array(
                            'force_std' => '',
                            'id' => 'job_type',
                            'cus_name' => 'job_type',
                            'options' => array(
                                'fulltime' => esc_html__('Full-Time', 'wp-jobsearch'),
                                'parttime' => esc_html__('Part-Time', 'wp-jobsearch'),
                                'contract' => esc_html__('Contract', 'wp-jobsearch'),
                                'internship' => esc_html__('Internship', 'wp-jobsearch'),
                                'temporary' => esc_html__('Temporary', 'wp-jobsearch'),
                            ),
                            'field_desc' => esc_html__('Choose which type of job to query.', 'wp-jobsearch'),
                        );
                        $jobsearch_form_fields->select_field($field_params);
                        ?>
                    </div>
                </div>
                <div class="jobsearch-element-field">
                    <div class="elem-label">
                        <label><?php esc_html_e('No. of Jobs to Import', 'wp-jobsearch') ?></label>
                    </div>
                    <div class="elem-field">
                        <?php
                        $field_params = array(
                            'force_std' => '10',
                            'id' => 'limit',
                            'cus_name' => 'num_jobs',
                            'field_desc' => esc_html__('Enter number of jobs to import. Default number of import jobs is 10.', 'wp-jobsearch'),
                        );
                        $jobsearch_form_fields->input_field($field_params);
                        ?>
                    </div>
                </div>
                <div class="jobsearch-element-field">
                    <div class="elem-label">
                        <label><?php esc_html_e('Expired on', 'wp-jobsearch') ?></label>
                    </div>
                    <div class="elem-field">
                        <?php
                        $field_params = array(
                            'force_std' => '0',
                            'id' => 'expire_days',
                            'cus_name' => 'expire_days',
                            'field_desc' => esc_html__('Enter number of days (numeric format) for expiray date after job posted date.', 'wp-jobsearch'),
                        );
                        $jobsearch_form_fields->input_field($field_params);
                        ?>
                    </div>
                </div>
                <div class="jobsearch-element-field">
                    <div class="elem-label">
                        <label><?php esc_html_e('Posted By', 'wp-jobsearch') ?></label>
                    </div>
                    <div class="elem-field">
                        <?php
                        jobsearch_get_custom_post_field('', 'employer', esc_html__('Auto Generate', 'wp-jobsearch'), 'job_username', 'job_username');
                        ?>
                    </div>
                </div>
                <div class="jobsearch-element-field">
                    <div class="elem-label">&nbsp;</div>
                    <div class="elem-field">
                        <a href="javascript:void(0);" class="impindeed-submit-btn button" data-gtopage="1"><?php esc_html_e('Import Jobs', 'wp-jobsearch') ?></a>
                    </div>
                    <div class="form-response-con">
                        <div class="response-loder"></div>
                        <div id="jobsync-proces-barcon" style="display: inline-block; width: 100%;"></div>
                        <div id="jobsync-proces-pgenums" style="display: inline-block; width: 100%;"></div>
                        <div class="response-msgcon"></div>
                    </div>
                </div>
            </form>
            <script>
                jQuery('form#jobsearch-import-indeed-jobs .impindeed-submit-btn').on('click', function (e) {
                    e.preventDefault();

                    var _this = jQuery(this),
                        this_form = _this.parents('form'),
                        page_num = _this.attr('data-gtopage'),
                        response_loder = this_form.find('.response-loder'),
                        response_msgcon = this_form.find('.response-msgcon'),
                        ajax_url = ajaxurl;

                    var get_form_dom = this_form[0];
                    var formData = new FormData(get_form_dom);

                    page_num = parseInt(page_num);
                    formData.append('page_num', page_num);

                    formData.append('action', 'jobsearch_import_scraping_indeed_jobs');

                    jQuery('#jobsync-proces-barcon').html('<div class="proces-bargray-con" style="display: inline-block; width: 100%; background-color: #cecece; height: 20px;">\
                        <div class="proces-bargreen-con" style="display: inline-block; width: 1%; background-color: #4caf50; height: 20px;"></div>\
                    </div>');
                    response_msgcon.html('');
                    response_loder.html('<?php esc_html_e('Please wait', 'wp-jobsearch') ?> <i class="fa fa-refresh fa-spin"></i>');
                    var request = jQuery.ajax({
                        url: ajax_url,
                        method: "POST",
                        processData: false,
                        contentType: false,
                        data: formData,
                        dataType: "json"
                    });

                    request.done(function (response) {
                        if (typeof response.msg !== undefined && response.msg != '' && response.msg != null) {
                            response_msgcon.html(response.msg);
                            response_loder.html('');
                        } else if (typeof response.html !== undefined && response.html != '' && response.html != null) {
                            response_msgcon.append(response.html);
                        }
                        if (typeof response.reload !== undefined && response.reload != null && response.reload == '1') {
                            window.location.reload();
                        }
                    });

                    request.fail(function (jqXHR, textStatus) {
                        response_loder.html('');
                    });

                    return false;

                });
            </script>
        </div>
        <?php
    }
    
    public function jobsearch_import_indeed_jobs() {
        global $jobsearch_plugin_options;
        $keyword = jobsearch_esc_html($_POST['keyword']);
        $location = jobsearch_esc_html($_POST['location']);
        $num_jobs = absint($_POST['num_jobs']);
        $expire_days = $_POST['expire_days'];
        $platform = 'indeed';
        
        if ($keyword != '') {
            $job_username = sanitize_text_field($_POST['job_username']);
            
            $page_num = isset($_POST['page_num']) && $_POST['page_num'] > 1 ? $_POST['page_num'] : 1;
            $job_count = isset($_POST['job_count']) && $_POST['job_count'] > 1 ? $_POST['job_count'] : 1;
            $job_actcount = isset($_POST['job_actcount']) && $_POST['job_actcount'] > 0 ? $_POST['job_actcount'] : 0;

            $det_base_url = 'https://uk.indeed.com/';
            $base_url = 'https://uk.indeed.com/jobs/';

            $query_arr = array();
            $query_arr[] = 'q=' . urlencode($keyword);

            if ($location != '') {
                $query_arr[] = 'l=' . urlencode($location);
            }
            if ($page_num > 1) {
                $query_arr[] = 'start=' . ($page_num - 1) * 10;
            }

            if (!empty($query_arr)) {
                $base_url = $base_url . '?' . implode('&', $query_arr);
            }

            $html = wp_remote_get($base_url,
            array(
                'timeout' => 120,
                'httpversion' => '1.1',
            ));
            $html = $html['body'];
            
            //$html = file_get_contents($base_url);
            $dom = new DOMDocument();

            @$dom->loadHTML($html);

            $xpath = new DOMXPath($dom);

            $jobs_elements = $xpath->query("//a[contains(@class, 'jobtitle')]");

            if (isset($jobs_elements->length) && $jobs_elements->length > 0) {

                $found_jobs = $jobs_elements->length;
                $found_elems_counter = 1;
                $js_html = '';
                foreach ($jobs_elements as $job_element) {
                    
                    if ($found_elems_counter == $job_count) {
                        $u = explode('?', $job_element->getAttribute('href'));
                        $ur = explode('&', $u[1]);
                        $url = explode('=', $ur[0]);
                        $jk = $url[1];

                        $job_url = $det_base_url . 'viewjob?jk=' . $jk . '&from=serp&vjs=3';

                        $existing_id = jobsearch_get_postmeta_id_byval('jobsearch_field_job_detail_url', $job_url);
                        if ($existing_id > 0) {
                            //
                        } else {
                            $job_detail = @file_get_html($job_url);

                            $job_title = '';
                            if ($job_detail) {
                                foreach ($job_detail->find('h1.jobsearch-JobInfoHeader-title') as $job_title_html) {
                                    $job_title = wp_kses($job_title_html, array());
                                }
                            }
                            
                            if ($job_title != '') {
                                $company_image = '';
                                $job_company = '';
                                $job_salary = '';
                                $job_desc = '';
                                foreach ($job_detail->find('div.jobsearch-CompanyInfoWithoutHeaderImage') as $company_image_html) {
                                    $company_image = $company_image_html;
                                }
                                foreach ($job_detail->find('div.jobsearch-InlineCompanyRating>div.icl-u-xs-mr--xs') as $job_company_html) {
                                    $job_company = wp_kses($job_company_html, array());
                                }
                                foreach ($job_detail->find('div.jobsearch-JobMetadataHeader-item') as $job_salary_html) {
                                    $job_salary = wp_kses($job_salary_html, array());
                                }
                                foreach ($job_detail->find('div#jobDescriptionText') as $job_desc_html) {
                                    $job_desc = esc_html($job_desc_html);
                                }

                                $job_desc = str_replace(array('&lt;', '&gt;'), array('<', '>'), $job_desc);

                                $job_location = '';

                                $job_salary_min = '';
                                $job_salary_max = '';
                                
                                if ($job_salary != '') {
                                    $job_salary = str_replace(array(','), array(''), $job_salary);
                                    $job_salary_parts = explode('-', $job_salary);
                                    if (isset($job_salary_parts[0]) && isset($job_salary_parts[1])) {
                                        preg_match('!\d+!', $job_salary_parts[0], $job_salary_min);
                                        if (isset($job_salary_min[0])) {
                                            $job_salary_min = $job_salary_min[0];
                                        } else {
                                            $job_salary_min = '';
                                        }
                                        preg_match('!\d+!', $job_salary_parts[1], $job_salary_max);
                                        if (isset($job_salary_max[0])) {
                                            $job_salary_max = $job_salary_max[0];
                                        } else {
                                            $job_salary_max = '';
                                        }
                                    } else {
                                        preg_match('!\d+!', $job_salary, $job_salary_min);
                                        if (isset($job_salary_min[0])) {
                                            $job_salary_min = $job_salary_min[0];
                                        } else {
                                            $job_salary_min = '';
                                        }
                                    }
                                }
                                $post_data = array(
                                    'post_type' => 'job',
                                    'post_title' => $job_title,
                                    //'post_content' => '',
                                    'post_content' => $job_desc,
                                    'post_status' => 'publish',
                                );
                                // Insert the job into the database
                                $post_id = wp_insert_post($post_data);

                                //
                                update_post_meta($post_id, 'jobsearch_job_employer_status', 'approved');
                                update_post_meta($post_id, 'jobsearch_field_job_featured', '');

                                // Insert job username meta key
                                if ($job_username > 0) {
                                    update_post_meta($post_id, 'jobsearch_field_job_posted_by', $job_username, true);
                                } else {
                                    if ($job_company != '') {
                                        jobsearch_fake_generate_employer_byname($job_company, $post_id);
                                    }
                                }

                                // Insert job posted on meta key
                                update_post_meta($post_id, 'jobsearch_field_job_publish_date', current_time('timestamp'), true);

                                // Insert job expired on meta key
                                $expired_date = date('d-m-Y H:i:s', strtotime("$expire_days days", current_time('timestamp')));
                                update_post_meta($post_id, 'jobsearch_field_job_expiry_date', strtotime($expired_date), true);

                                // Insert job status meta key
                                update_post_meta($post_id, 'jobsearch_field_job_status', 'approved', true);

                                // Insert job address meta key
                                if ($job_location != '') {
                                    update_post_meta($post_id, 'jobsearch_field_location_address', $job_location, true);
                                }

                                update_post_meta($post_id, 'jobsearch_field_job_salary', $job_salary_min, true);
                                update_post_meta($post_id, 'jobsearch_field_job_max_salary', $job_salary_max, true);

                                // Insert job referral meta key
                                update_post_meta($post_id, 'jobsearch_job_referral', 'indeed', true);

                                // Insert job detail url meta key
                                update_post_meta($post_id, 'jobsearch_field_job_detail_url', ($job_url), true);
                                update_post_meta($post_id, 'jobsearch_field_job_jk', ($jk), true);

                                update_post_meta($post_id, 'jobsearch_field_job_apply_type', 'external', true);
                                update_post_meta($post_id, 'jobsearch_field_job_apply_url', $job_url, true);
                                $job_type = isset($_POST['job_type']) ? $_POST['job_type'] : '';
                                if ($job_type) {
                                    $job_type = self::get_job_type($job_type);
                                    $term = get_term_by('name', $job_type, 'jobtype');
                                    if ($term == '') {
                                        wp_insert_term($job_type, 'jobtype');
                                        $term = get_term_by('name', $job_type, 'jobtype');
                                    }
                                    wp_set_post_terms($post_id, $term->term_id, 'jobtype');
                                }

                                $job_actcount++;
                            }
                        }

                        if ($job_actcount >= $num_jobs) {
                            break;
                            $msg = sprintf(esc_html__('%s Jobs Imported Successfully.', 'wp-jobsearch'), $job_actcount);
                            wp_send_json(array('error' => '0', 'msg' => $msg, 'reload' => '1'));
                        }

                        if ($found_jobs > $job_count) {
                            $job_count++;
                            ob_start();
                            ?>
                            <script>
                                var this_form = jQuery('form#jobsearch-import-indeed-jobs'),
                                page_num = this_form.find('.import-submit-btn').attr('data-gtopage'),
                                response_loder = this_form.find('.response-loder'),
                                response_msgcon = this_form.find('.response-msgcon');
                        
                                var pging_html = 'Job <?php echo ($job_actcount) ?> of <?php echo ($num_jobs) ?> jobs';
                                jQuery('#jobsync-proces-pgenums').html(pging_html);

                                <?php
                                if ($job_actcount > 0) {
                                    ?>
                                    var perc = (parseInt(<?php echo ($job_actcount) ?>) * 100) / parseInt(<?php echo ($num_jobs) ?>);
                                    if (perc > 100) {
                                        perc = 100;
                                    }
                                    <?php
                                } else {
                                    ?>
                                    var perc = 1;
                                    <?php
                                }
                                ?>
                                jQuery('#jobsync-proces-barcon').find('.proces-bargreen-con').css({width: perc + '%'});
                        
                                var request = jQuery.ajax({
                                    url: '<?php echo admin_url('admin-ajax.php') ?>',
                                    method: "POST",
                                    data: {
                                        keyword: '<?php echo ($keyword) ?>',
                                        location: '<?php echo ($location) ?>',
                                        num_jobs: '<?php echo ($num_jobs) ?>',
                                        platform: '<?php echo ($platform) ?>',
                                        expire_days: '<?php echo ($expire_days) ?>',
                                        page_num: '<?php echo ($page_num) ?>',
                                        found_jobs: '<?php echo ($found_jobs) ?>',
                                        job_count: '<?php echo ($job_count) ?>',
                                        job_actcount: '<?php echo ($job_actcount) ?>',
                                        action: 'jobsearch_import_scraping_indeed_jobs'
                                    },
                                    dataType: "json"
                                });

                                request.done(function (response) {
                                    if (typeof response.msg !== undefined && response.msg != '' && response.msg != null) {
                                        response_msgcon.html(response.msg);
                                        response_loder.html('');
                                    } else if (typeof response.html !== undefined && response.html != '' && response.html != null) {
                                        response_msgcon.append(response.html);
                                    }
                                    if (typeof response.reload !== undefined && response.reload != null && response.reload == '1') {
                                        window.location.reload();
                                    }
                                });

                                request.fail(function (jqXHR, textStatus) {
                                    response_loder.html('');
                                });
                            </script>
                            <?php
                            $js_html = ob_get_clean();
                        }
                        if ($found_jobs > 1 && $found_jobs <= $job_count) {
                            $page_num++;

                            $base_url = 'https://uk.indeed.com/jobs/';
                            
                            $query_arr = array();
                            $query_arr[] = 'q=' . urlencode($keyword);

                            if ($location != '') {
                                $query_arr[] = 'l=' . urlencode($location);
                            }
                            if ($page_num > 1) {
                                $query_arr[] = 'start=' . ($page_num - 1) * 10;
                            }

                            if (!empty($query_arr)) {
                                $base_url = $base_url . '?' . implode('&', $query_arr);
                            }

                            $html = file_get_contents($base_url);
                            $dom = new DOMDocument();

                            @$dom->loadHTML($html);

                            $xpath = new DOMXPath($dom);

                            $jobs_elements = $xpath->query("//a[contains(@class, 'jobtitle')]");
                            
                            if (isset($jobs_elements->length) && $jobs_elements->length > 0) {
                                $found_jobs = $jobs_elements->length;
                                ob_start();
                                ?>
                                <script>
                                    var this_form = jQuery('form#jobsearch-import-indeed-jobs'),
                                    page_num = this_form.find('.import-submit-btn').attr('data-gtopage'),
                                    response_loder = this_form.find('.response-loder'),
                                    response_msgcon = this_form.find('.response-msgcon');
                                    var request = jQuery.ajax({
                                        url: '<?php echo admin_url('admin-ajax.php') ?>',
                                        method: "POST",
                                        data: {
                                            keyword: '<?php echo ($keyword) ?>',
                                            location: '<?php echo ($location) ?>',
                                            num_jobs: '<?php echo ($num_jobs) ?>',
                                            platform: '<?php echo ($platform) ?>',
                                            expire_days: '<?php echo ($expire_days) ?>',
                                            page_num: '<?php echo ($page_num) ?>',
                                            found_jobs: '<?php echo ($found_jobs) ?>',
                                            job_count: 1,
                                            job_actcount: '<?php echo ($job_actcount) ?>',
                                            action: 'jobsearch_import_scraping_indeed_jobs'
                                        },
                                        dataType: "json"
                                    });

                                    request.done(function (response) {
                                        if (typeof response.msg !== undefined && response.msg != '' && response.msg != null) {
                                            response_msgcon.html(response.msg);
                                            response_loder.html('');
                                        } else if (typeof response.html !== undefined && response.html != '' && response.html != null) {
                                            response_msgcon.append(response.html);
                                        }
                                        if (typeof response.reload !== undefined && response.reload != null && response.reload == '1') {
                                            window.location.reload();
                                        }
                                    });

                                    request.fail(function (jqXHR, textStatus) {
                                        response_loder.html('');
                                    });
                                </script>
                                <?php
                                $js_html = ob_get_clean();
                            }
                        }
                        break;
                    }
                    $found_elems_counter++;
                }
                if ($js_html != '') {
                    wp_send_json(array('error' => '0', 'html' => $js_html));
                }
                $msg = sprintf(esc_html__('%s Jobs Imported Successfully.', 'wp-jobsearch'), $job_actcount);
                wp_send_json(array('error' => '0', 'msg' => $msg, 'reload' => '1'));
            }
            if ($page_num > 1) {
                $msg = sprintf(esc_html__('%s Jobs Imported Successfully.', 'wp-jobsearch'), $job_actcount);
                wp_send_json(array('error' => '0', 'msg' => $msg, 'reload' => '1'));
            } else {
                $msg = esc_html__('No job found.', 'wp-jobsearch');
                wp_send_json(array('error' => '1', 'msg' => $msg));
            }
        } else {
            $msg = esc_html__('Please enter the keyword.', 'wp-jobsearch');
            wp_send_json(array('error' => '1', 'msg' => $msg));
        }
    }
    
    public static function get_job_type($type) {
        switch ($type) {
            case 'fulltime' :
                $type = esc_html__('Full Time', 'wp-jobsearch');
                break;
            case 'parttime' :
                $type = esc_html__('Part Time', 'wp-jobsearch');
                break;
            case 'contract' :
                $type = esc_html__('Contract', 'wp-jobsearch');
                break;
            case 'internship' :
                $type = esc_html__('Internship', 'wp-jobsearch');
                break;
            case 'temporary' :
                $type = esc_html__('Temporary', 'wp-jobsearch');
                break;
        }
        return $type;
    }

}

return new JobSearch_Indeed_Jobs_Scraping_Hooks();
