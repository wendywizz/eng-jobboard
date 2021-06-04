<?php
/**
 * Listing search box
 *
 */
global $jobsearch_post_job_types, $jobsearch_plugin_options;

$user_id = $user_company = '';
if (is_user_logged_in()) {
    $user_id = get_current_user_id();
    $user_company = get_user_meta($user_id, 'jobsearch_company', true);
}

$default_job_no_custom_fields = isset($jobsearch_plugin_options['jobsearch_job_no_custom_fields']) ? $jobsearch_plugin_options['jobsearch_job_no_custom_fields'] : '';
$quick_apply_job = isset($atts['quick_apply_job']) ? $atts['quick_apply_job'] : '';
$quick_apply_job_btn = $quick_apply_job == 'on' && !wp_is_mobile() ? 'jobsearch-quick-apply-show' : '';

if (false === ($job_view = jobsearch_get_transient_obj('jobsearch_job_view' . $job_short_counter))) {
    $job_view = isset($atts['job_view']) ? $atts['job_view'] : '';
}
$jobs_excerpt_length = isset($atts['jobs_excerpt_length']) ? $atts['jobs_excerpt_length'] : '18';
$jobsearch_split_map_title_limit = '20';

$job_no_custom_fields = isset($atts['job_no_custom_fields']) ? $atts['job_no_custom_fields'] : $default_job_no_custom_fields;
if ($job_no_custom_fields == '' || !is_numeric($job_no_custom_fields)) {
    $job_no_custom_fields = 3;
}
$job_filters = isset($atts['job_filters']) ? $atts['job_filters'] : '';
$jobsearch_jobs_title_limit = isset($atts['jobs_title_limit']) ? $atts['jobs_title_limit'] : '5';

$paging_var = 'job_page';
$job_page = isset($_REQUEST[$paging_var]) && $_REQUEST[$paging_var] != '' ? $_REQUEST[$paging_var] : 1;
$job_ad_banners_rep = isset($atts['job_ad_banners_rep']) ? $atts['job_ad_banners_rep'] : '';

$job_per_page = isset($atts['job_per_page']) ? $atts['job_per_page'] : '-1';
$job_per_page = isset($_REQUEST['per-page']) ? $_REQUEST['per-page'] : $job_per_page;
$counter = 1;
if ($job_page >= 2) {
    $counter = (
            ($job_page - 1) *
            $job_per_page) +
        1;
}

$sectors_enable_switch = isset($jobsearch_plugin_options['sectors_onoff_switch']) ? $jobsearch_plugin_options['sectors_onoff_switch'] : '';
$all_location_allow = isset($jobsearch_plugin_options['all_location_allow']) ? $jobsearch_plugin_options['all_location_allow'] : '';
$job_types_switch = isset($jobsearch_plugin_options['job_types_switch']) ? $jobsearch_plugin_options['job_types_switch'] : '';

$columns_class = 'jobsearch-column-12';

$http_request = jobsearch_server_protocol();
$locations_view_type = isset($atts['job_loc_listing']) ? $atts['job_loc_listing'] : '';
if (!is_array($locations_view_type)) {

    $loc_types_arr = $locations_view_type != '' ? explode(',', $locations_view_type) : '';
} else {
    $loc_types_arr = $locations_view_type;
}


$loc_view_country = $loc_view_state = $loc_view_city = false;
if (!empty($loc_types_arr)) {
    if (is_array($loc_types_arr) && in_array('country', $loc_types_arr)) {
        $loc_view_country = true;
    }
    if (is_array($loc_types_arr) && in_array('state', $loc_types_arr)) {
        $loc_view_state = true;
    }
    if (is_array($loc_types_arr) && in_array('city', $loc_types_arr)) {
        $loc_view_city = true;
    }
}

ob_start();

$has_featured_posts = false;
$featjobs_posts_arr = '';
if (isset($featjobs_posts) && !empty($featjobs_posts)) {
    $featjobs_posts_arr = $featjobs_posts;
    $has_featured_posts = true;
    $job_views_publish_date = isset($jobsearch_plugin_options['job_views_publish_date']) ? $jobsearch_plugin_options['job_views_publish_date'] : '';
    ?>
    <div class="jobsearch-job jobsearch-joblisting-classic">
        <ul class="jobsearch-row">
            <?php
            foreach ($featjobs_posts as $fjobs_post) {
                $job_id = $fjobs_post;
                $job_random_id = rand(1111111, 9999999);

                $job_publish_date = get_post_meta($job_id, 'jobsearch_field_job_publish_date', true);
                $post_thumbnail_id = jobsearch_job_get_profile_image($job_id);
                $post_thumbnail_image = wp_get_attachment_image_src($post_thumbnail_id, apply_filters('jobsearch_jobs_actlist_thmb_size', 'thumbnail'));
                $post_thumbnail_src = isset($post_thumbnail_image[0]) && esc_url($post_thumbnail_image[0]) != '' ? $post_thumbnail_image[0] : '';
                $post_thumbnail_src = $post_thumbnail_src == '' ? jobsearch_no_image_placeholder() : $post_thumbnail_src;
                $post_thumbnail_src = apply_filters('jobsearch_jobemp_image_src', $post_thumbnail_src, $job_id);
                $jobsearch_job_featured = get_post_meta($job_id, 'jobsearch_field_job_featured', true);
                $company_name = jobsearch_job_get_company_name($job_id, '@ ');
                $get_job_location = get_post_meta($job_id, 'jobsearch_field_location_address', true);
                $postby_emp_id = get_post_meta($job_id, 'jobsearch_field_job_posted_by', true);
                $job_city_title = jobsearch_post_city_contry_txtstr($job_id, $loc_view_country, $loc_view_state, $loc_view_city);
                $job_type_str = jobsearch_job_get_all_jobtypes($job_id, 'jobsearch-option-btn');
                $sector_str = jobsearch_job_get_all_sectors($job_id, '', '', '', '<li><i class="jobsearch-icon jobsearch-filter-tool-black-shape"></i>', '</li>');
                ?>
                <li class="<?php echo($columns_class); ?>">
                    <div class="jobsearch-joblisting-classic-wrap">
                        <?php

                        echo apply_filters('jobsearch_jobs_listing_befor_urgent_html', '', $job_id, 'listin_1');
                        jobsearch_empjobs_urgent_pkg_iconlab($postby_emp_id, $job_id, 'job_listv1');
                        ob_start();
                        if ($post_thumbnail_src != '') { ?>
                            <figure>
                                <a href="<?php echo $quick_apply_job == 'on' && !wp_is_mobile() ? 'javascript:void(0)' : esc_url(get_permalink($job_id)); ?>"
                                   data-job-id="<?php echo esc_html($job_id); ?>"
                                   class="<?php echo($quick_apply_job_btn) ?>">
                                    <img src="<?php echo esc_url($post_thumbnail_src) ?>" alt="">
                                </a>
                            </figure>
                            <?php
                        }
                        $list_emp_img = ob_get_clean();
                        echo apply_filters('jobsearch_jobs_listing_emp_img_html', $list_emp_img, $job_id, 'view1');
                        ?>
                        <div class="jobsearch-joblisting-text">
                            <div class="jobsearch-table-layer">
                                <div class="jobsearch-table-row">
                                    <div class="jobsearch-table-cell">
                                        <div class="jobsearch-list-option">
                                            <h2 class="jobsearch-pst-title <?php echo($quick_apply_job_btn) ?>"
                                                data-job-id="<?php echo esc_html($job_id); ?>">
                                                <a href="<?php echo $quick_apply_job == 'on' && !wp_is_mobile() ? 'javascript:void(0)' : esc_url(get_permalink($job_id)); ?>"
                                                   title="<?php echo esc_html(get_the_title($job_id)); ?>">
                                                    <?php echo esc_html(get_the_title($job_id)); ?>
                                                </a>
                                                <?php
                                                if ($jobsearch_job_featured == 'on') { ?>
                                                    <span><i class="fa fa-star"></i><?php echo esc_html__('Featured', 'wp-jobsearch'); ?></span>
                                                <?php } ?>
                                            </h2>
                                            <?php do_action('jobsearch_jobs_listing_after_title', $job_id, 'jobs_list_default'); ?>
                                            <ul>
                                                <?php
                                                if ($company_name != '') {
                                                    ob_start();
                                                    ?>
                                                    <li class="job-company-name"><?php echo force_balance_tags($company_name); ?></li>
                                                    <?php
                                                    $comp_name_html = ob_get_clean();
                                                    echo apply_filters('jobsearch_empname_in_joblistin', $comp_name_html, $job_id, 'view1');
                                                }
                                                if ($job_city_title != '') { ?>
                                                    <li>
                                                        <i class="jobsearch-icon jobsearch-maps-and-flags"></i><?php echo esc_html($job_city_title); ?>
                                                    </li>
                                                    <?php
                                                } else if (!empty($get_job_location) && $all_location_allow == 'on') {
                                                    ?>
                                                    <li>
                                                        <i class="jobsearch-icon jobsearch-maps-and-flags"></i><?php echo esc_html($get_job_location); ?>
                                                    </li>
                                                    <?php
                                                }
                                                ?>
                                            </ul>
                                            <ul>
                                                <?php
                                                if ($job_publish_date != '' && $job_views_publish_date == 'on') { ?>
                                                    <li>
                                                        <i class="jobsearch-icon jobsearch-calendar"></i><?php printf(esc_html__('Published %s', 'wp-jobsearch'), jobsearch_time_elapsed_string($job_publish_date)); ?>
                                                    </li>
                                                <?php }

                                                do_action('jobsearch_job_listing_deadline', $atts, $job_id);
                                                if (!empty($sector_str) && $sectors_enable_switch == 'on') {
                                                    echo apply_filters('jobsearch_joblisting_sector_str_html', $sector_str, $job_id, '<li><i class="jobsearch-icon jobsearch-calendar"></i>', '</li>');
                                                }
                                                ?>
                                            </ul>
                                            <?php


                                            do_action('jobsearch_job_listing_custom_fields', $atts, $job_id, $job_arg['custom_fields']);
                                            ?>
                                        </div>
                                    </div>
                                    <div class="jobsearch-table-cell">
                                        <div class="jobsearch-job-userlist">
                                            <?php
                                            ob_start();
                                            if ($job_type_str != '') {
                                                echo force_balance_tags($job_type_str);
                                            }
                                            $type_html = ob_get_clean();
                                            echo apply_filters('jobsearch_job_inlist_jobtype_html', $type_html, $job_id, 'default_view');

                                            ob_start();
                                            $book_mark_args = array(
                                                'job_id' => $job_id,
                                                'before_icon' => 'fa fa-heart-o',
                                                'after_icon' => 'fa fa-heart',
                                            );
                                            do_action('jobsearch_job_shortlist_button_frontend', $book_mark_args);
                                            $shbtn_html = ob_get_clean();
                                            echo apply_filters('jobsearch_job_listin_shsave_btn_html', $shbtn_html, $job_id);
                                            ?>
                                        </div>
                                    </div>
                                    <div class="clearfix"></div>
                                </div>
                            </div>
                            <?php
                            if (jobsearch_excerpt(0, $job_id) != '') { ?>
                                <div class="jobsearch-list-excerpt">
                                    <p><?php echo jobsearch_excerpt(0, $job_id) ?></p>
                                </div>
                                <?php
                            }
                            do_action('jobsearch_job_listing_after_excerpt', $job_id);
                            ?>
                        </div>
                    </div>
                </li>
                <?php
            }
            ?>
        </ul>
    </div>
<?php } ?>
<div class="jobsearch-job jobsearch-joblisting-classic" id="jobsearch-job-<?php echo absint($job_short_counter) ?>">


    <ul class="jobsearch-row">
        <?php
        if ($job_loop_obj->have_posts()) {
            $flag_number = 1;

            $job_views_publish_date = isset($jobsearch_plugin_options['job_views_publish_date']) ? $jobsearch_plugin_options['job_views_publish_date'] : '';

            $ads_rep_counter = 1;
            while ($job_loop_obj->have_posts()) : $job_loop_obj->the_post();
                global $post, $jobsearch_member_profile;
                $job_id = $post;
                $job_random_id = rand(1111111, 9999999);

                $job_publish_date = get_post_meta($job_id, 'jobsearch_field_job_publish_date', true);
                $post_thumbnail_id = jobsearch_job_get_profile_image($job_id);
                $post_thumbnail_image = wp_get_attachment_image_src($post_thumbnail_id, apply_filters('jobsearch_jobs_actlist_thmb_size', 'thumbnail'));
                $post_thumbnail_src = isset($post_thumbnail_image[0]) && esc_url($post_thumbnail_image[0]) != '' ? $post_thumbnail_image[0] : '';
                $post_thumbnail_src = $post_thumbnail_src == '' ? jobsearch_no_image_placeholder() : $post_thumbnail_src;
                $post_thumbnail_src = apply_filters('jobsearch_jobemp_image_src', $post_thumbnail_src, $job_id);
                $jobsearch_job_featured = get_post_meta($job_id, 'jobsearch_field_job_featured', true);
                $company_name = jobsearch_job_get_company_name($job_id, '@ ');
                $get_job_location = get_post_meta($job_id, 'jobsearch_field_location_address', true);

                $postby_emp_id = get_post_meta($job_id, 'jobsearch_field_job_posted_by', true);

                $job_city_title = jobsearch_post_city_contry_txtstr($job_id, $loc_view_country, $loc_view_state, $loc_view_city);

                $job_type_str = jobsearch_job_get_all_jobtypes($job_id, 'jobsearch-option-btn');
                $sector_str = jobsearch_job_get_all_sectors($job_id, '', '', '', '<li><i class="jobsearch-icon jobsearch-filter-tool-black-shape"></i>', '</li>');

                ?>
                <li class="<?php echo esc_html($columns_class); ?>">
                    <div class="jobsearch-joblisting-classic-wrap">
                        <?php 
                        echo apply_filters('jobsearch_jobs_listing_befor_urgent_html', '', $job_id, 'listin_1');
                        jobsearch_empjobs_urgent_pkg_iconlab($postby_emp_id, $job_id, 'job_listv1') ?>
                        <?php
                        $get_job_lat = get_post_meta($job_id, 'jobsearch_field_location_lat', true);
                        $get_job_lng = get_post_meta($job_id, 'jobsearch_field_location_lng', true);
                        //echo $get_job_lat . '|' . $get_job_lng;
                        ob_start();
                        if ($post_thumbnail_src != '') { ?>
                            <figure>
                                <a href="<?php echo $quick_apply_job == 'on' && !wp_is_mobile() ? 'javascript:void(0)' : esc_url(get_permalink($job_id)); ?>"
                                   data-job-id="<?php echo esc_html($job_id); ?>"
                                   class="<?php echo($quick_apply_job_btn) ?>">
                                    <img src="<?php echo esc_url($post_thumbnail_src) ?>" alt="">
                                </a>
                            </figure>
                            <?php
                        }
                        $list_emp_img = ob_get_clean();
                        echo apply_filters('jobsearch_jobs_listing_emp_img_html', $list_emp_img, $job_id, 'view1');
                        ?>
                        <div class="jobsearch-joblisting-text">
                            <div class="jobsearch-table-layer">
                                <div class="jobsearch-table-row">
                                    <div class="jobsearch-table-cell">
                                        <div class="jobsearch-list-option">
                                            <h2 class="jobsearch-pst-title <?php echo($quick_apply_job_btn) ?>"
                                                data-job-id="<?php echo esc_html($job_id); ?>">
                                                <a href="<?php echo $quick_apply_job == 'on' && !wp_is_mobile() ? 'javascript:void(0)' : esc_url(get_permalink($job_id)); ?>"
                                                   title="<?php echo esc_html(get_the_title($job_id)); ?>">
                                                    <?php echo esc_html(get_the_title($job_id)); ?>
                                                </a>
                                                <?php
                                                if ($jobsearch_job_featured == 'on') {
                                                    ?>
                                                    <span><i class="fa fa-star"></i> <?php echo esc_html__('Featured', 'wp-jobsearch'); ?></span>
                                                <?php } ?>
                                            </h2>
                                            <?php do_action('jobsearch_jobs_listing_after_title', $job_id, 'jobs_list_default'); ?>
                                            <ul>
                                                <?php
                                                if ($company_name != '') {
                                                    ob_start();
                                                    ?>
                                                    <li class="job-company-name"><?php echo force_balance_tags($company_name); ?></li>
                                                    <?php
                                                    $comp_name_html = ob_get_clean();
                                                    echo apply_filters('jobsearch_empname_in_joblistin', $comp_name_html, $job_id, 'view1');
                                                }

                                                if ($job_city_title != '' && $all_location_allow == 'on') {
                                                    ?>
                                                    <li>
                                                        <i class="jobsearch-icon jobsearch-maps-and-flags"></i><?php echo jobsearch_esc_html($job_city_title); ?>
                                                    </li>
                                                    <?php
                                                } else if (!empty($get_job_location) && $all_location_allow == 'on') { ?>
                                                    <li>
                                                        <i class="jobsearch-icon jobsearch-maps-and-flags"></i><?php echo jobsearch_esc_html($get_job_location); ?>
                                                    </li>
                                                    <?php
                                                }
                                                ?>
                                            </ul>
                                            <ul>
                                                <?php
                                                if ($job_publish_date != '' && $job_views_publish_date == 'on') {
                                                    ?>
                                                    <li>
                                                        <i class="jobsearch-icon jobsearch-calendar"></i><?php printf(esc_html__('Published %s', 'wp-jobsearch'), jobsearch_time_elapsed_string($job_publish_date)); ?>
                                                    </li>
                                                    <?php
                                                }

                                                do_action('jobsearch_job_listing_deadline', $atts, $job_id);
                                                if (!empty($sector_str) && $sectors_enable_switch == 'on') {
                                                    echo apply_filters('jobsearch_joblisting_sector_str_html', $sector_str, $job_id, '<li><i class="jobsearch-icon jobsearch-filter-tool-black-shape"></i>', '</li>');
                                                }
                                                ?>
                                            </ul>
                                            <?php

                                            do_action('jobsearch_job_listing_custom_fields', $atts, $job_id, $job_arg['custom_fields']);
                                            ?>
                                        </div>
                                    </div>
                                    <div class="jobsearch-table-cell">
                                        <div class="jobsearch-job-userlist">
                                            <?php
                                            ob_start();
                                            if ($job_type_str != '') {
                                                echo force_balance_tags($job_type_str);
                                            }
                                            $type_html = ob_get_clean();
                                            echo apply_filters('jobsearch_job_inlist_jobtype_html', $type_html, $job_id, 'default_view');

                                            ob_start();
                                            $book_mark_args = array(
                                                'job_id' => $job_id,
                                                'before_icon' => 'fa fa-heart-o',
                                                'after_icon' => 'fa fa-heart',
                                            );
                                            do_action('jobsearch_job_shortlist_button_frontend', $book_mark_args);
                                            $shbtn_html = ob_get_clean();
                                            echo apply_filters('jobsearch_job_listin_shsave_btn_html', $shbtn_html, $job_id);
                                            ?>
                                        </div>
                                    </div>
                                    <div class="clearfix"></div>
                                </div>
                            </div>
                            <?php
                            if (jobsearch_excerpt(0, $job_id) != '') {
                                ?>
                                <div class="jobsearch-list-excerpt">
                                    <p><?php echo jobsearch_excerpt(0, $job_id) ?></p>
                                </div>
                                <?php
                            }
                            //
                            do_action('jobsearch_job_listing_after_excerpt', $job_id);
                            ?>
                        </div>
                    </div>
                </li>
                <?php
                if ($job_ad_banners_rep == 'no') {
                    ob_start();
                    do_action('jobsearch_random_ad_banners', $atts, $job_loop_obj, $counter, 'job_listing');
                    $baner_html = ob_get_clean();
                    if ($baner_html != '' && $ads_rep_counter == 1) {
                        echo($baner_html);
                        $ads_rep_counter++;
                    }

                } else {
                    do_action('jobsearch_random_ad_banners', $atts, $job_loop_obj, $counter, 'job_listing');
                }

                $counter++;
                $flag_number++; // number variable for job
            endwhile;
            wp_reset_postdata();
        } else {
            if (!$has_featured_posts) {
                echo
                    '<li class="' . esc_html($columns_class) . '">
                    <div class="no-job-match-error">
                        <strong>' . esc_html__('No Record', 'wp-jobsearch') . '</strong>
                        <span>' . esc_html__('Sorry!', 'wp-jobsearch') . '&nbsp; ' . esc_html__('Does not match record with your keyword', 'wp-jobsearch') . ' </span>
                        <span>' . esc_html__('Change your filter keywords to re-submit', 'wp-jobsearch') . '</span>
                        <em>' . esc_html__('OR', 'wp-jobsearch') . '</em>
                        <a href="' . esc_url($page_url) . '">' . esc_html__('Reset Filters', 'wp-jobsearch') . '</a>
                    </div>
                </li>';
            }
        }
        ?>
    </ul>
</div>
<?php
$listing_html = ob_get_clean();
echo apply_filters('jobsearch_jobslisting_def_template_html', $listing_html, $atts, $job_loop_obj, $job_short_counter, $featjobs_posts, $page_url);