<script lang="ts">
  import type { PlayerIndex } from '$lib/api/PlayerIndex'
  import type { VideoList } from '$lib/back_types/channel'
  import Header from '/src/parts/Header.svelte'
  import PlaceHolder from '/src/parts/PlaceHolder.svelte'
  import { playerMaster, channelMaster, videoMaster, loadChannels, loadVideos } from '$lib/store/global'
  import T from '/src/parts/T.svelte'
  import DateParts from '/src/parts/Date.svelte'
  import PlayerName from '/src/parts/PlayerName.svelte'
  import ChannelName from '/src/parts/ChannelName.svelte'
  import BigNumber from '/src/parts/BigNumber.svelte'
  import DateTime from '/src/parts/DateTime.svelte'

  function sortVideo(players: PlayerIndex[], videoMaster: VideoList) {
    return players.filter(p => p.data?.youtube && videoMaster[p.data?.youtube[0]]).sort((a, b) => {
      const channel_a = a.data?.youtube
      const channel_b = b.data?.youtube
      const video_a = videoMaster[(channel_a || [])[0]]
      const video_b = videoMaster[(channel_b || [])[0]]
      if (!!video_a.concurrentViewers || !!video_b.concurrentViewers) {
        return (video_b.concurrentViewers || 0) - (video_a.concurrentViewers || 0)
      }
      return (new Date(video_b.publishedAt).getTime() - new Date(video_a.publishedAt).getTime())
    })
  }
</script>

<style>
</style>

<Header title="チャンネル一覧" type="article" url="channel" description="ポケモンユナイトプレイヤのチャンネルの一覧" />
<h2>Channel</h2>

<h3>ToDo</h3>
<ul style="padding-left: 20px">
  <li>定期的にチャンネル情報を再取得する</li>
  <li>チャンネルIDが設定されてるのに情報取れてないものがあるかチェックする</li>
  <li>公式チャンネルなどもリストに入れる</li>
</ul>

{#if ($channelMaster || loadChannels())}
  <p><T>チャンネルデータ取得</T> {$channelMaster.stored_at.toLocaleString()}</p>
{/if}

{#if ($videoMaster || loadVideos())}
  <p><T>ビデオデータ取得</T>
{/if}

<table style="table-layout: auto">
  <thead>
  </thead>
  <tbody class="double">
    {#if Array.isArray($playerMaster.players) && $channelMaster && $videoMaster}
      {#each sortVideo($playerMaster.players, $videoMaster) as player}
        {@const channel = player.data?.youtube}
        {@const master = $channelMaster.list[(channel || [])[0]]}
        {@const video = $videoMaster[(channel || [])[0]]}
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
              <ChannelName channel_id={channel[0]} title={master.title} />
              <T>プレイヤー</T>
              <PlayerName name={player.name} />
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
            </td>
          </tr>
          <tr>
            <td class="tal">
              {#if video}
                <T>
                  {#if video.liveBroadcastContent === 'live'}
                    👀 {video.concurrentViewers}<T>人</T>
                  {:else}
                    🎞️
                  {/if}
                </T>
                <a href="https://www.youtube.com/watch?v={video.id}">{video.title}</a>
                <T>(<DateTime datetime={video.publishedAt} />)</T>
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