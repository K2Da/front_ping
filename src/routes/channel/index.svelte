<script lang="ts">
  import type { VideoData } from '$lib/back_types/channel'
  import type { Channel } from '$lib/api/ChannelIndex'
  import Header from '/src/parts/Header.svelte'
  import PlaceHolder from '/src/parts/PlaceHolder.svelte'
  import { channelJson, channelMaster, videoMaster, loadChannels, loadVideos, loadChannelJson } from '$lib/store/global'
  import T from '/src/parts/T.svelte'
  import DateParts from '/src/parts/Date.svelte'
  import PlayerName from '/src/parts/PlayerName.svelte'
  import ChannelName from '/src/parts/ChannelName.svelte'
  import BigNumber from '/src/parts/BigNumber.svelte'
  import DateDiff from '/src/parts/DateDiff.svelte'
  import { afterNavigate } from '$app/navigation'

  afterNavigate(() => {
    loadChannelJson()
    loadVideos()
    loadChannels()
  })

  function sortVideo(channels: Channel[], videoMaster: Record<string, VideoData>) {
    return channels.filter(c => videoMaster[c.id]).sort((a, b) => {
      const video_a = videoMaster[a.id]
      const video_b = videoMaster[b.id]
      if (!!video_a.concurrentViewers || !!video_b.concurrentViewers) {
        return (video_b.concurrentViewers || 0) - (video_a.concurrentViewers || 0)
      }
      return (new Date(video_b.publishedAt).getTime() - new Date(video_a.publishedAt).getTime())
    })
  }
  let show_detail = false
</script>

<Header title="チャンネル一覧" type="article" url="channel" description="ポケモンユナイトプレイヤのチャンネルの一覧" />

<h2>Channel</h2>

<div>
  <input id="show_detail" type="checkbox" bind:checked={show_detail} />
  <label for="show_detail">詳細表示</label>
</div>

{#if show_detail}
  {#if $channelMaster}
    <p><T>チャンネルデータ取得</T> {$channelMaster.stored_at.toLocaleString()}</p>
  {/if}
  {#if $videoMaster}
    <p><T>ビデオデータ取得</T>
  {/if}

  <h3>ToDo</h3>
  <ul style="padding-left: 20px">
    <li>チャンネルIDが設定されてるのに情報取れてないものがあるかチェックする</li>
    <li>公式チャンネルなどもリストに入れる</li>
  </ul>
{/if}

<table style="table-layout: auto">
  <thead>
  </thead>
  <tbody class="double">
    {#if Array.isArray($channelJson) && $channelMaster && $videoMaster}
      {#each sortVideo($channelJson, $videoMaster.list) as channel}
        {@const master = $channelMaster.list[channel.id]}
        {@const video = $videoMaster.list[channel.id]}
        {#if channel && master}
          <tr>
            <td rowspan="2" style="width: 100px; padding: 0 4px 0 4px;">
              {#if video}
                <div style="vertical-align: middle;">
                  <a href="https://www.youtube.com/watch?v={video.id}">
                    <img src={video.thumbnail}
                         alt="動画サムネイル"
                         style="vertical-align: middle;"/>
                  </a>
                </div>
              {/if}
            </td>
            <td class="tal" style="vertical-align: middle">
              <img src={master.thumbnail}
                   alt="チャンネル画像"
                   style="border-radius: 50%; width: 1.2em; height: 1.2em; vertical-align: middle;"/>
              <ChannelName channel_id={channel.id} title={master.title} />
              {#if channel.player}
                <T>プレイヤー</T>
                <PlayerName name={channel.player} />
              {/if}
              {#if show_detail}
                <T>開設</T>
                <DateParts date={master.publishedAt} spacing={false} />
                <T>再生</T>
                <BigNumber num={master.viewCount} />
                {#if !!master.subscriberCount}
                  <T>登録者</T>
                  <BigNumber num={master.subscriberCount} />
                {/if}
                <T>動画</T>
                {master.videoCount.toLocaleString()}
              {/if}
            </td>
          </tr>
          <tr>
            <td class="tal">
              {#if video}
                <T>
                  {#if video.liveBroadcastContent === 'live'}
                    👀 {video.concurrentViewers}<T>人</T>
                  {:else if video.liveBroadcastContent === 'upcoming'}
                    📅
                  {:else}
                    🎞️
                  {/if}
                </T>
                <a href="https://www.youtube.com/watch?v={video.id}">{video.title}</a>
                  {#if video.liveBroadcastContent !== 'live'}
                    <T>(<DateDiff datetime={video.publishedAt} />)</T>
                    {#if show_detail}
                      <T>再生数</T>
                      {video.viewCount ? video.viewCount.toLocaleString() : '-'}
                      <T>コメント数</T>
                      {video.commentCount ? video.commentCount.toLocaleString() : '-'}
                      <T>Like</T>
                      {video.likeCount ? video.likeCount.toLocaleString() : '-'}
                      <T>fav</T>
                      {video.favoriteCount ? video.favoriteCount.toLocaleString() : '-'}
                      <t>checked</t>
                      {new Date(video.storedAt)}
                    {/if}
                  {/if}
                {/if}
            </td>
          </tr>
        {/if}
      {/each}
    {:else}
      <PlaceHolder />
    {/if}
  </tbody>
</table>